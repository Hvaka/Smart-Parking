
import mongoose from "mongoose";

export default mongoose.model("Vehicle", {
  vehicleNumber: { type: String, index: true },
  type: String,
  entryTime: Date,
  exitTime: Date,
  amount: Number,
  status: { type: String, default: "active" },
  paymentMode: String
});
