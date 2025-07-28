import mongoose from 'mongoose';


// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Delivered', 'Completed', 'Refunded'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Models
const Order = mongoose.model('Order', orderSchema);

// Export models
export { Order };
