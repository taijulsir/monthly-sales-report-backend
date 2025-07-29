import { OrderItem } from "#models/orderItem/orderItemModel.js";

export const calculateTotalSales = async (startDate, endDate) => {
    const orderItems = await OrderItem.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: "$productId",
                totalSales: { $sum: { $multiply: ["$unitPrice", "$quantity"] } }
            }
        }
    ]);

    let totalSales = 0;
    orderItems.forEach(item => {
        totalSales += item.totalSales;
    });

    return totalSales > 0 ? Math.round(totalSales) : 0;
};
