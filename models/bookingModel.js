import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceImg: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["local", "online"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);
