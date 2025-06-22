import mongoose, { Schema } from 'mongoose';

const PropertySchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    location: String,
  },
  { timestamps: true }
);

export const Property =
  mongoose.models.Property || mongoose.model('Property', PropertySchema);
