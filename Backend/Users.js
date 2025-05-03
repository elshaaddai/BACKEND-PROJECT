// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     dateTime: {
//       type: String,
//       required: true,
//     },
//     additionalDetails: {
//       type: String,
//       default: "",
//     },
//     status: {
//       type: String,
//       enum: ["pending", "completed"],
//       default: "pending",
//     },
//   },
//   { _id: false }
// );

// // buat schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   booking: [bookingSchema],
// });

// // buat model
// const User = mongoose.model("User", userSchema);

// module.exports = User;
