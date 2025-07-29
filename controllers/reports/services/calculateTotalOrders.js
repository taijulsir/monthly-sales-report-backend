import { Order } from "#models/order/orderModel.js";

// Function to calculate Total Orders
export const calculateTotalOrders = async (startDate, endDate) => {
    const totalOrders = await Order.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
    });
    return totalOrders;
};
