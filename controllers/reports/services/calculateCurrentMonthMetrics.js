import { calculateMonthlyEarnings } from './calculateMonthlyEarnings.js';
import { calculateNewCustomers } from './calculateNewCustomers.js';
import { calculateTotalOrders } from './calculateTotalOrders.js';
import { calculateTotalSales } from './calculateTotalSales.js';

export const calculateCurrentMonthMetrics = async (startDate, endDate) => {
    // Calculate the current month's earnings, total orders, total sales, and new customers
    const currentEarnings = await calculateMonthlyEarnings(startDate, endDate);
    const currentOrders = await calculateTotalOrders(startDate, endDate);
    const currentSales = await calculateTotalSales(startDate, endDate);
    const currentCustomers = await calculateNewCustomers(startDate, endDate);

    return {
        currentEarnings,
        currentOrders,
        currentSales,
        currentCustomers
    };
}