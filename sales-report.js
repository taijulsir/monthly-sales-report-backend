import { OrderItem, Order, Customer, Product } from '../models'; // Assuming your models are correctly imported

// Utility to get the start and end dates of the month
const getStartAndEndOfMonth = (year, month) => {
  const start = new Date(year, month - 1, 1); // First day of the month
  const end = new Date(year, month, 0); // Last day of the month
  return { start, end };
};

// 1. Function to calculate Monthly Earnings
const calculateMonthlyEarnings = async (startDate, endDate) => {
  const orderItems = await OrderItem.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: "$productId",
        totalQuantity: { $sum: "$quantity" },
        totalEarnings: { $sum: { $multiply: ["$unitPrice", "$quantity"] } },
        totalCost: { $sum: { $multiply: ["$costPrice", "$quantity"] } }
      }
    }
  ]);

  let monthlyEarnings = 0;
  orderItems.forEach(item => {
    const earnings = item.totalEarnings - item.totalCost;
    monthlyEarnings += earnings;
  });
  
  return monthlyEarnings;
};

// 2. Function to calculate Total Orders
const calculateTotalOrders = async (startDate, endDate) => {
  const totalOrders = await Order.countDocuments({
    createdAt: { $gte: startDate, $lte: endDate }
  });
  return totalOrders;
};

// 3. Function to calculate Total Sales
const calculateTotalSales = async (startDate, endDate) => {
  const orderItems = await OrderItem.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: "$productId",
        totalSales: { $sum: { $multiply: ["$unitPrice", "$quantity"] } }
      }
    }
  ]);
  
  let totalSales = 0;
  orderItems.forEach(item => {
    totalSales += item.totalSales;
  });

  return totalSales;
};

// 4. Function to calculate New Customers
const calculateNewCustomers = async (startDate, endDate) => {
  const newCustomers = await Customer.countDocuments({
    createdAt: { $gte: startDate, $lte: endDate }
  });
  return newCustomers;
};

// 5. Function to calculate the same metrics for the previous month
const calculatePreviousMonthMetrics = async (previousStartDate, previousEndDate) => {
  const previousEarnings = await calculateMonthlyEarnings(previousStartDate, previousEndDate);
  const previousOrders = await calculateTotalOrders(previousStartDate, previousEndDate);
  const previousSales = await calculateTotalSales(previousStartDate, previousEndDate);
  const previousCustomers = await calculateNewCustomers(previousStartDate, previousEndDate);

  return {
    previousEarnings,
    previousOrders,
    previousSales,
    previousCustomers
  };
};

// 6. Main function to get all metrics for the current month and previous month comparison
const getMonthlyData = async (startDate, endDate, previousStartDate, previousEndDate) => {
  const monthlyEarnings = await calculateMonthlyEarnings(startDate, endDate);
  const totalOrders = await calculateTotalOrders(startDate, endDate);
  const totalSales = await calculateTotalSales(startDate, endDate);
  const newCustomers = await calculateNewCustomers(startDate, endDate);

  const {
    previousEarnings,
    previousOrders,
    previousSales,
    previousCustomers
  } = await calculatePreviousMonthMetrics(previousStartDate, previousEndDate);

  return {
    monthlyEarnings,
    totalOrders,
    totalSales,
    newCustomers,
    previousMonthComparison: {
      earningsDifference: monthlyEarnings - previousEarnings,
      ordersDifference: totalOrders - previousOrders,
      salesDifference: totalSales - previousSales,
      customersDifference: newCustomers - previousCustomers
    }
  };
};

export { getMonthlyData };
