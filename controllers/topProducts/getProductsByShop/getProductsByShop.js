import { OrderItem } from '#models/orderItem/orderItemModel.js';
import { Product } from '#models/product/productModel.js';
import Store from '#models/store/storeModel.js';
import { getDateRange } from './services/getDateRange.js';




export const getTopProdcutsByShop = async (req, res) => {
    const { shopName, startDate, endDate, amount, priceRange } = req.query;

    // Get the date range
    const { startDate: rangeStart, endDate: rangeEnd } = getDateRange(startDate, endDate);

    try {

        if (shopName) {
            // Use Regex for partial matching and case-insensitive search
            const shop = await Store.findOne({
                name: { $regex: shopName, $options: 'i' }  // Case-insensitive search
            });

            // If the shop is not found, return an empty array
            if (!shop) {
                return res.status(200).json({
                    message: 'Shop not found',
                    data: {
                        products: [],
                        shops: []
                    }
                });
            }

            const products = await Product.find({ storeId: shop._id });
            const orderItems = await OrderItem.find({
                createdAt: { $gte: rangeStart, $lte: rangeEnd },
                productId: { $in: products.map(product => product._id) },
                
            });

            if (orderItems.length === 0) {
                return res.status(200).json({
                    message: 'No products found',
                    data: {
                        products: [],
                        shops: [shop]
                    }
                });
            }

            // then need to sort product by  low to high or high to low 






        }

        // Prepare the match conditions for the query
        const matchConditions = {
            createdAt: { $gte: rangeStart, $lte: rangeEnd },
            storeId: shop._id // Filter products by storeId
        };

        // Aggregation pipeline to get popular products (top 4) from order items
        const popularProducts = await OrderItem.aggregate([
            {
                $match: matchConditions,  // Filter by date range and storeId
            },
            {
                $lookup: {
                    from: 'products',  // Lookup to get product details
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'  // Unwind to get the product data
            },
            {
                $group: {
                    _id: '$productId',  // Group by productId
                    totalQuantity: { $sum: '$quantity' },  // Total quantity sold
                    totalSales: { $sum: { $multiply: ['$unitPrice', '$quantity'] } },  // Total sales (unitPrice * quantity)
                    totalCost: { $sum: { $multiply: ['$productDetails.costPrice', '$quantity'] } },  // Total cost (costPrice * quantity)
                }
            },
            {
                $sort: { totalSales: priceRange === 'Low to High' ? 1 : -1 }  // Sorting based on total sales (amount)
            },
            {
                $limit: 4  // Limit to top 4 products
            },
            {
                $lookup: {
                    from: 'stores',  // Lookup to get store details
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'storeDetails'
                }
            },
            {
                $unwind: '$storeDetails'  // Unwind the storeDetails
            },
            {
                $project: {
                    productId: 1,
                    totalQuantity: 1,
                    totalSales: 1,
                    totalCost: 1,
                    storeId: '$storeDetails._id',
                    storeName: '$storeDetails.name',
                    storeLocation: '$storeDetails.location',
                    productName: '$productDetails.name',
                    productImage: '$productDetails.image',
                    price: '$productDetails.salePrice' // Include product price for price range sorting
                }
            }
        ]);

        // Return the popular products with their details
        res.status(200).json({
            message: 'Top products fetched successfully',
            data: popularProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching popular products', error: error.message });
    }
};

