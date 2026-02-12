// models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },

  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", ContactSchema);
