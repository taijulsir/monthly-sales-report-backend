import { Order } from "#models/order/orderModel.js";

// MongoDB aggregation pipeline to calculate total checkout and refunded amounts
export const aggregateSaleAnalytics = async (startDate, endDate) => {

    const salesAnalytics = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lt: endDate },
                status: { $in: ['Completed', 'Refunded'] }  // Match only Completed or Refunded orders
            }
        },
        {
            $lookup: {
                from: 'orderitems',  // Join Order with OrderItem
                localField: '_id',    // Use the _id of Order to match orderId in OrderItem
                foreignField: 'orderId',
                as: 'orderItems'
            }
        },
        {
            $unwind: '$orderItems'  // Unwind orderItems to access them easily
        },
        {
            $lookup: {
                from: 'products',  // Lookup products to get the cost price
                localField: 'orderItems.productId',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: '$productDetails'  // Unwind the productDetails array
        },
        {
            $group: {
                _id: '$status',  // Group by status (Completed or Refunded)
                totalAmount: { $sum: { $multiply: ['$orderItems.unitPrice', '$orderItems.quantity'] } },  // Sum of unitPrice * quantity
                totalCost: { $sum: { $multiply: ['$productDetails.costPrice', '$orderItems.quantity'] } },  // Sum of costPrice * quantity
                totalQuantity: { $sum: '$orderItems.quantity' }  // Sum of quantity
            }
        },
        {
            $project: {
                _id: 0,
                status: '$_id',
                totalAmount: 1,
                totalCost: 1,
                totalQuantity: 1
            }
        }
    ]);

    return salesAnalytics;
} 
