// Main Function to get total amounts for completed and refunded orders and calculate income using reduce
export const getTotalAmounts = (saleAnalytics) => {
    const result = saleAnalytics.reduce((acc, analytics) => {
        if (analytics.status === 'Completed') {
            acc.totalCheckout += analytics.totalAmount;  // Accumulate the total amount for completed orders
        } else if (analytics.status === 'Refunded') {
            acc.totalRefunded += analytics.totalAmount;  // Accumulate the total amount for refunded orders
        }
        return acc;
    }, { totalCheckout: 0, totalRefunded: 0 });  // Initial accumulator values

    return result;
}
