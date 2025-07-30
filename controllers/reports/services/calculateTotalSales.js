import { Order } from "#models/order/orderModel.js";
import { OrderItem } from "#models/orderItem/orderItemModel.js";

export const calculateTotalSales = async (startDate, endDate) => {

    const orderAggregation = await Order.aggregate([
        {
            $match: {
                status: 'Completed',
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: null,
                totalOrderAmount: { $sum: "$totalAmount" }
            }
        }
    ]);

    const totalOrderAmount = orderAggregation.length > 0 ? Math.round(orderAggregation[0].totalOrderAmount) : 0;


    return totalOrderAmount;
};
