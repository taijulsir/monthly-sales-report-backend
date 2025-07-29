// Function to calculate previous month range
export const getPreviousMonthRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get the previous month by adjusting the month of the startDate and endDate
    start.setMonth(start.getMonth() - 1);
    end.setMonth(end.getMonth() - 1);

    // Adjust the start and end dates in case of invalid dates (like if the start day is 31 and the previous month has 30 days)
    if (start.getDate() !== new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()) {
        start.setDate(Math.min(start.getDate(), new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()));
    }

    if (end.getDate() !== new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate()) {
        end.setDate(Math.min(end.getDate(), new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate()));
    }

    // Return the previous month's start and end dates
    return {
        previousStartDate: start,
        previousEndDate: end
    };
};
