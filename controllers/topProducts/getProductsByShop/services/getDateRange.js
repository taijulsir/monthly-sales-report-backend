// Helper function to get date range
export const getDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
        const today = new Date();
        startDate = today.setHours(0, 0, 0, 0);  // Start of the day
        endDate = today.setHours(23, 59, 59, 999);  // End of the day
    }

    return { startDate: new Date(startDate), endDate: new Date(endDate) };
};