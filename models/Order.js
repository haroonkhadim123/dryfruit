import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
      deviceId:{
type:String,required:true
  },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },

    // Products array
    products: [
      {
        name: { type: String, required: true },
        grams: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],

    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    orderDate: { type: Date, default: Date.now }, // date when order is created
  },
  { timestamps: true } // auto add createdAt and updatedAt
);

// Create the model or use existing
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
