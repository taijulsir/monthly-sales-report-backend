// Function to group order items by product and store
export const groupOrderItems = (orderItems) => {
    const productMap = new Map();
    const storeMap = new Map();

    orderItems.forEach(item => {
        const product = item.productId;
        const store = item.productId.storeId;

        // Group by productId
        if (!productMap.has(product._id)) {
            productMap.set(product._id, {
                ...product.toObject(),
                totalQuantity: item.quantity,
                totalSale: Math.round(item.total)  // Round the totalSale value
            });
        } else {
            const existingProduct = productMap.get(product._id);
            existingProduct.totalQuantity += item.quantity;
            existingProduct.totalSale += Math.round(item.total);  // Round each totalSale value before accumulating
        }

        // Group by storeId
        if (!storeMap.has(store._id)) {
            storeMap.set(store._id, {
                ...store.toObject(),
                totalSale: Math.round(item.total)  // Round the totalSale value
            });
        } else {
            const existingStore = storeMap.get(store._id);
            existingStore.totalSale += Math.round(item.total);  // Round each totalSale value before accumulating
        }
    });

    return {
        products: Array.from(productMap.values()),
        stores: Array.from(storeMap.values())
    };
};
