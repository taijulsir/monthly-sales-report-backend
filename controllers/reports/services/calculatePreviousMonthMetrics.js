
import { calculateMonthlyEarnings } from './calculateMonthlyEarnings.js';
import { calculateNewCustomers } from './calculateNewCustomers.js';
import { calculateTotalOrders } from './calculateTotalOrders.js';
import { calculateTotalSales } from './calculateTotalSales.js';

// Function to calculate the same metrics for the previous month
export const calculatePreviousMonthMetrics = async (previousStartDate, previousEndDate) => {
    const previousEarnings = await calculateMonthlyEarnings(previousStartDate, previousEndDate);
    const previousOrders = await calculateTotalOrders(previousStartDate, previousEndDate);
    const previousSales = await calculateTotalSales(previousStartDate, previousEndDate);
    const previousCustomers = await calculateNewCustomers(previousStartDate, previousEndDate);

    return {
        previousEarnings,
        previousOrders,
        previousSales,
        previousCustomers
    };
};