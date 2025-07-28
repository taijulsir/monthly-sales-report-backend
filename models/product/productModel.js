import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Models
const Product = mongoose.model('Product', productSchema);

// Export models
export { Product };
