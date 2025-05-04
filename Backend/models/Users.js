const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    dateTime: {
      type: String, // Pertimbangkan menggunakan tipe Date jika memungkinkan manipulasi tanggal/waktu di backend
      required: true,
    },
    additionalDetails: {
      type: String,
      default: "",
    },
    status: {
      // Status ini ada di schema tapi tidak digunakan saat create/get? Bisa ditambahkan jika perlu
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { _id: true, timestamps: true } // Tambahkan _id dan timestamps jika diinginkan untuk sub-dokumen
);

// buat schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      // Pastikan password di-hash saat create/update user
      type: String,
      required: true,
    },
    booking: [bookingSchema], // Array booking
  },
  { timestamps: true }
); // Tambahkan timestamps ke schema utama jika diinginkan

// buat model
const User = mongoose.model("User", userSchema);

module.exports = User;
