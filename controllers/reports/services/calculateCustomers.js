import { Customer } from "#models/customer/customerModel.js";

// Function to calculate New Customers
export const calculateCustomers = async (startDate, endDate) => {
    const customers = await Customer.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
    });
    return customers;
};