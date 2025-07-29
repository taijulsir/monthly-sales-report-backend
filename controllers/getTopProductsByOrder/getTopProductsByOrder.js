import { OrderItem } from "#models/orderItem/orderItemModel.js";

 export const getTopProductsByOrder = async (req, res) => {
    const { startDate, endDate } = req.params;

    try {
        // MongoDB aggregation pipeline to get popular products based on total order quantity
        const popularProducts = await OrderItem.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }  // Filter by order creation date
                }
            },
            {
                $group: {
                    _id: '$productId',  // Group by productId
                    totalQuantity: { $sum: '$quantity' },  // Sum the total quantity for each product
                }
            },
            {
                $sort: { totalQuantity: -1 }  // Sort by totalQuantity in descending order
            },
            {
                $limit: 10  // Limit to top 10 popular products (adjust as needed)
            },
            {
                $lookup: {
                    from: 'products',  // Lookup to join with Product collection
                    localField: '_id',  // Local field (productId)
                    foreignField: '_id',  // Foreign field (productId in Product collection)
                    as: 'productDetails'  // Output field containing product data
                }
            },
            {
                $unwind: '$productDetails'  // Unwind productDetails to access fields
            },
            {
                $project: {
                    _id: 0,
                    productId: '$_id',  // Include the productId
                    productName: '$productDetails.name',  // Product name
                    productImage: '$productDetails.image',  // Product image
                    totalQuantity: 1  // Total quantity sold
                }
            }
        ]);

        // Return the popular products
        res.status(200).json({
            message: 'Popular products fetched successfully',
            staus: 200,
            data: popularProducts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching popular products',
            staus: 500,
            error: error.message
        });
    }
};

