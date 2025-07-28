import mongoose from 'mongoose';

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
}, { timestamps: true });


// Models
const Customer = mongoose.model('Customer', customerSchema);

// Export models
export { Customer };
