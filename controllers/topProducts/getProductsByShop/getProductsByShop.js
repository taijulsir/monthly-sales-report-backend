import { OrderItem } from '#models/orderItem/orderItemModel.js';
import Store from '#models/store/storeModel.js';
import { getDateRange } from './services/getDateRange.js';
import { getProductsForShop } from './services/getProductsForShop.js';
import { groupOrderItems } from './services/groupOrderItems.js';
import { handleEmptyData } from './services/handleEmptyData.js';
import { sortData } from './services/sortData.js';

// Main function to get top products by shop
export const getTopProductsByShop = async (req, res) => {
    const { shopName, startDate, endDate, amount, priceRange } = req.query;

    // Get the date range
    const { startDate: rangeStart, endDate: rangeEnd } = getDateRange(startDate, endDate);

    try {
        // Step 1: If shopName is provided, find the shop and fetch its products
        if (shopName) {
            const shop = await Store.findOne({
                name: { $regex: shopName, $options: 'i' }  // Case-insensitive search
            });

            if (!shop) {
                // Use the helper function for empty shop response
                return handleEmptyData(res, 'Shop not found');
            }

            // Fetch products for the found shop
            const products = await getProductsForShop(shop._id, priceRange, amount);

            // Fetch order items for the given products and date range
            const orderItems = await OrderItem.find({
                createdAt: { $gte: rangeStart, $lte: rangeEnd },
                productId: { $in: products.map(product => product._id) }
            }).populate('productId');

            if (orderItems.length === 0) {
                // Use the helper function for empty order items response
                return handleEmptyData(res, 'No products found', { products: [], shops: [shop] });
            }

            const totalSale = orderItems.reduce((total, oi) => total + oi.total, 0);

            return res.status(200).json({
                message: `${shop.name} products fetched successfully`,
                status: 200,
                data: {
                    products: products.slice(0, 4), // Return top 4 products
                    shops: [{
                        ...shop.toObject(),
                        totalSale // Include total sale in shop data
                    }]
                }
            });

        } else {
            // Step 2: If no shopName is provided, fetch all order items
            const orderItems = await OrderItem
                .find({ createdAt: { $gte: rangeStart, $lte: rangeEnd } })
                .populate({
                    path: 'productId',
                    populate: { path: 'storeId' }
                });

            // If no order items found, return empty data using the helper function
            if (orderItems.length === 0) {
                return handleEmptyData(res, 'No products found');
            }

            // Step 3: Group order items by productId and storeId
            const { products: groupedProducts, stores: groupedStores } = groupOrderItems(orderItems);

            // Step 4: Sort the products and stores based on amount and price range
            const { sortedProducts, sortedStores } = sortData(groupedProducts, groupedStores, amount);

            return res.status(200).json({
                message: 'Top products fetched successfully',
                status: 200,
                data: {
                    products: sortedProducts.slice(0, 4), // Return top 4 products
                    shops: sortedStores.slice(0, 4) // Return top 4 stores
                }
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching popular products',
            error: error.message
        });
    }
};
