const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    s_no: { type: Number, unique: true, required: true },
    name_of_customer: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    dob: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Apply compound index for email and mobile_number
customerSchema.index({ email: 1, mobile_number: 1 });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
