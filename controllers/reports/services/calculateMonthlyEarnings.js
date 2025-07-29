import { OrderItem } from "#models/orderItem/orderItemModel.js";

//  Function to calculate Monthly Earnings
export const calculateMonthlyEarnings = async (startDate, endDate) => {
    const orderItems = await OrderItem.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: "$productId",
                totalQuantity: { $sum: "$quantity" },
                totalEarnings: { $sum: { $multiply: ["$unitPrice", "$quantity"] } },
                totalCost: { $sum: { $multiply: ["$costPrice", "$quantity"] } }
            }
        }
    ]);

    let monthlyEarnings = 0;
    orderItems.forEach(item => {
        const earnings = item.totalEarnings - item.totalCost;
        monthlyEarnings += earnings;
    });

    return monthlyEarnings;
};
