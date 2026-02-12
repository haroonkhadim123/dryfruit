import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  deviceId:{
type:String,required:true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
   
  name: String,
  image:String,
  price: Number,
  qty: {
    type: Number,
    default: 1,
  },
  grams: {
    type: Number,
    default: 250, // default weight 100 grams (optional)
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);