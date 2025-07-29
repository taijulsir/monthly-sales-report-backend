import { Customer } from "#models/customer/customerModel.js";

// Function to calculate New Customers
export const calculateNewCustomers = async (startDate, endDate) => {
    const newCustomers = await Customer.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
    });
    return newCustomers;
};