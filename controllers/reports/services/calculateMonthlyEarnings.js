import { Order } from "#models/order/orderModel.js";
import { OrderItem } from "#models/orderItem/orderItemModel.js";

// Function to calculate Monthly Earnings using reduce
export const calculateMonthlyEarnings = async (startDate, endDate) => {

    // Step 1: Get orders with status 'Completed' within the date range
    const completedOrders = await Order.find({
        status: 'Completed',
        createdAt: { $gte: startDate, $lte: endDate }
    }).select('_id');  // Fetching only the _id of completed orders

    // Step 2: Get order items based on the completed orders
    const orderItems = await OrderItem.find({
        orderId: { $in: completedOrders.map(order => order._id) }  // Filter by orderId
    }).populate('productId');  // Populate the productId to get the product details like costPrice


    // Step 3: Calculate the earnings using reduce
    const monthlyEarnings = orderItems.reduce((total, item) => {
        // Calculate the earnings for each order item
        const earnings = (item.unitPrice * item.quantity) - (item.productId.costPrice * item.quantity);  // Earnings = (unitPrice * quantity) - (costPrice * quantity)
        return total + earnings;  // Accumulate the total earnings
    }, 0);  // Initial value for total is 0

    return Math.round(monthlyEarnings) ;  // Round the earnings to 2 decimal places
};
