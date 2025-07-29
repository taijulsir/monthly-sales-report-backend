// Helper function to calculate percentage change
const calculatePercentageChange = (current, previous) => {
    if (previous === 0) {
        return current > 0 ? 100 : 0;  // If previous is 0 and current is positive, it's a 100% increase; if current is 0, it's a 0% change
    }
    return Math.round(((current - previous) / previous) * 100);
};

export const calculatePercentageDifference = ({
    currentMonthMetrics,
    previousMonthMetrics
}) => {
    // Extract current month metrics and previous month metrics
    const { currentEarnings, currentOrders, currentSales, currentCustomers } = currentMonthMetrics;
    const { previousEarnings, previousOrders, previousSales, previousCustomers } = previousMonthMetrics;

    // Calculate percentage change for each metric
    const earningsPercentageChange = calculatePercentageChange(currentEarnings, previousEarnings);
    const ordersPercentageChange = calculatePercentageChange(currentOrders, previousOrders);
    const salesPercentageChange = calculatePercentageChange(currentSales, previousSales);
    const customersPercentageChange = calculatePercentageChange(currentCustomers, previousCustomers);

    return {
        earningsPercentageChange,
        ordersPercentageChange,
        salesPercentageChange,
        customersPercentageChange
    }
};