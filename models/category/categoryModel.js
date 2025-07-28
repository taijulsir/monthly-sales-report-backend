import mongoose from 'mongoose';

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Models
const Category = mongoose.model('Category', categorySchema);

// Export models
export { Category };

