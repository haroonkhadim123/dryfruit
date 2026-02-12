import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    oldprice: {
      type: Number,
      required: true,
    },

    newprice: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    

    
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
