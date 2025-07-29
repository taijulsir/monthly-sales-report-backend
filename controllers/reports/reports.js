import { getPreviousMonthRange } from '#utils/getPreviousMonthRange.js';
import { calculateCurrentMonthMetrics } from './services/calculateCurrentMonthMetrics.js';
import { calculatePercentageDifference } from './services/calculatePercentageDifference.js';
import { calculatePreviousMonthMetrics } from './services/calculatePreviousMonthMetrics.js';

// Main function to get all metrics for the current month and previous month comparison
export const getMonthlyData = async (req, res) => {
    const { startDate, endDate } = req.params;

    // Get the previous month's start and end dates
    const { previousStartDate, previousEndDate } = getPreviousMonthRange(startDate, endDate);

    try {
        // Calculate the current month's earnings, orders, sales, and customers
        const { currentEarnings, currentOrders, currentSales, currentCustomers } = await calculateCurrentMonthMetrics(startDate, endDate);

        // Calculate the previous month's earnings, orders, sales, and customers
        const { previousEarnings, previousOrders, previousSales, previousCustomers } = await calculatePreviousMonthMetrics(previousStartDate, previousEndDate);

        // Calculate percentage change for each metric
        const {
            earningsPercentageChange,
            ordersPercentageChange,
            salesPercentageChange,
            customersPercentageChange
        } = calculatePercentageDifference({
            currentMonthMetrics: { currentEarnings, currentOrders, currentSales, currentCustomers },
            previousMonthMetrics: { previousEarnings, previousOrders, previousSales, previousCustomers }
        });

        // Return the response with all the metrics and comparisons
        res.status(200).json({
            message: 'Monthly data generated successfully',
            staus: 200,
            data: {
                currentEarnings,
                currentOrders,
                currentSales,
                currentCustomers,
                previousMonthComparison: {
                    earningsDifference: currentEarnings - previousEarnings,
                    ordersDifference: currentOrders - previousOrders,
                    salesDifference: currentSales - previousSales,
                    customersDifference: currentCustomers - previousCustomers,
                    earningsPercentageChange,
                    ordersPercentageChange,
                    salesPercentageChange,
                    customersPercentageChange
                }
            }
        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({
            message: 'Failed to generate monthly data',
            staus: 500,
            error: error.message
        });
    }
};

