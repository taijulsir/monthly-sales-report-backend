// Helper function to validate parameters
export const validateParams = (params) => {
    const { startDate, endDate, amount, priceRange } = params;

    // Validate startDate and endDate
    if (startDate && !isValidDate(startDate)) {
        return { valid: false, message: "Invalid startDate format. Expected YYYY-MM-DD." };
    }
    if (endDate && !isValidDate(endDate)) {
        return { valid: false, message: "Invalid endDate format. Expected YYYY-MM-DD." };
    }

    // Validate amount (should be 'lowToHigh' or 'highToLow')
    if (amount && !['lowToHigh', 'highToLow'].includes(amount)) {
        return { valid: false, message: "Invalid amount. Expected 'lowToHigh' or 'highToLow'." };
    }

    // Validate priceRange (should be a valid number)
    if (priceRange && isNaN(priceRange)) {
        return { valid: false, message: "Invalid priceRange. Expected a valid number." };
    }

    return { valid: true };  // All validations passed
};

// Helper function to validate date format (YYYY-MM-DD) and normalize it
export const isValidDate = (date) => {
    if (!date) return false;  // Return false if date is not provided
    // Normalize the date format (ensure two digits for month and day)
    const [year, month, day] = date.split('-');

    // Check if month and day are single digits, and add a leading zero if necessary
    const normalizedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Validate the normalized date format (YYYY-MM-DD)
    const regex = /^\d{4}-\d{2}-\d{2}$/;  // Check for YYYY-MM-DD format
    return regex.test(normalizedDate) && !isNaN(new Date(normalizedDate).getTime()); // Ensure it's a valid date
};
