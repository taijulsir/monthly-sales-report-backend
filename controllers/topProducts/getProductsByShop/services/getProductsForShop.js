import { Product } from "#models/product/productModel.js";

//  function to fetch and process products
export const getProductsForShop = async (shopId, priceRange, amount) => {
    const products = await Product.find({
        storeId: shopId,
        salePrice: { $lte: priceRange }
    }).sort({ salePrice: amount === "lowToHigh" ? 1 : -1 });

    return products;
};
