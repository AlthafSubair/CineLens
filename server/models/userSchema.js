import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpires: {
    type: Date,
    required: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  role: { type: String, default: "user" },
  authType: { type: String, enum: ['normal', 'google'], default: 'normal' },
  avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
