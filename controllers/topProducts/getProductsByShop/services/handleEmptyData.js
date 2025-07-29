// Helper function to handle empty data responses
export const handleEmptyData = (res, message, data = { products: [], shops: [] }) => {
    return res.status(200).json({
        message: message,
        data: data
    });
};
