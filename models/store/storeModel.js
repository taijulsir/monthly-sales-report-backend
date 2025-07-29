import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  // Store name
  address: {
    type: String,
    required: true
  },  // Store address
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },  // GeoJSON type for location
    coordinates: {
      type: [Number],
      required: true
    }  // [longitude, latitude]
  },
  storeType: {
    type: String,
    required: false
  },  // Optional store type (e.g., electronics, fashion)
  contactDetails: {
    phone: {
      type: String,
      required: false
    },  // Optional store phone number
    email: {
      type: String,
      required: false
    }   // Optional store email
  },
  isActive: {
    type: Boolean,
    default: false
  },  // Optional feature flag for the store
  logo: {
    type: String,
    default: false
  },  // Optional feature flag for the store
}, { timestamps: true });

// Index for geospatial queries (for better map marker performance)
storeSchema.index({ location: '2dsphere' });

const Store = mongoose.model('Store', storeSchema);

export default Store;
