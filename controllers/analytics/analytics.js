
import { aggregateSaleAnalytics } from "./services/aggregateSaleAnalytics.js";
import { getTotalAmounts } from "./services/getTotalAmounts.js";



// Controller to get sale analytics (Completed and Refunded orders) for the given month and year
const getSaleAnalytics = async (req, res) => {
    const { year, month } = req.params;

    // Ensure the month is 2 digits (e.g., 03 for March)
    const formattedMonth = month.padStart(2, '0');

    try {
        // Define the date range for the given month
        const startDate = new Date(`${year}-${formattedMonth}-01T00:00:00Z`);
        const endDate = new Date(`${year}-${formattedMonth}-01T23:59:59Z`);

        endDate.setMonth(endDate.getMonth() + 1);  // Move to the next month to ensure we cover the whole month

        // Get the sale analytics data
        const saleAnalytics = await aggregateSaleAnalytics(startDate, endDate);

        // Calculate total amounts for completed and refunded orders and calculate income
        const { totalCheckout, totalRefunded, totalIncome } = getTotalAmounts(saleAnalytics);


        // Return the sale analytics response
        res.status(200).json({
            message: 'Sale analytics data fetched successfully',
            staus: 200,
            data: {
                totalCheckout,
                totalRefunded,
                totalIncome
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching sale analytics data',
            staus: 500,
            error: error.message
        });
    }
};

export { getSaleAnalytics };
