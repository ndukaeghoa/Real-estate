import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true, index: true },
    rent: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, default: 1 },
    amenities: [{ type: String }],
    photos: [{ type: String }],
    availableFrom: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Listing = mongoose.model('Listing', listingSchema);
