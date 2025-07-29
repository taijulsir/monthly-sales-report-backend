//  Function to sort products and stores
export const sortData = (products = [], stores = [], amount = "lowToHigh") => {
    // Sort products by totalQuantity first, then by totalSale
    const sortedProducts = products
        ?.sort((a, b) => b.totalQuantity - a.totalQuantity)
        ?.sort((a, b) => amount === "lowToHigh" ? a.salePrice - b.salePrice : b.salePrice - a.salePrice);

    // Sort stores by totalSale
    const sortedStores = stores?.sort((a, b) => b.totalSale - a.totalSale);

    return { sortedProducts, sortedStores };
};