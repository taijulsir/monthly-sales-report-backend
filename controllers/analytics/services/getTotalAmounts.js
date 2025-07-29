
 // Helper function to calculate income from order items
const calculateIncome = (unitPrice, quantity, costPrice) => {
    return (unitPrice * quantity) - (costPrice * quantity);
};

// Main Function to get total amounts for completed and refunded orders and calculate income
export const getTotalAmounts = (saleAnalytics) => {
    // Initialize totals for completed and refunded orders
    let totalCheckout = 0;
    let totalRefunded = 0;
    let totalIncome = 0;


    // Process the aggregation results
    saleAnalytics.forEach(analytics => {
        if (analytics.status === 'Completed') {
            totalCheckout = analytics.totalAmount;
            totalIncome += calculateIncome(analytics.totalAmount, analytics.totalQuantity, analytics.totalCost);  // Calculate income for completed
        } else if (analytics.status === 'Refunded') {
            totalRefunded = analytics.totalAmount;
        }
    });

    return {
        totalCheckout,
        totalRefunded,
        totalIncome
    }

}