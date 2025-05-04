const User = require("../models/Users");

const createBooking = async (email, bookingData) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Pastikan booking adalah array
  if (!Array.isArray(user.booking)) {
    user.booking = [];
  }

  user.booking.push(bookingData);
  return await user.save();
};

const findBookings = async () => {
  const users = await User.find({}, "name email booking");
  return users.flatMap((user) =>
    Array.isArray(user.booking)
      ? user.booking.map((booking) => ({
          userId: user._id,
          name: user.name,
          email: user.email,
          dateTime: booking.dateTime,
          additionalDetails: booking.additionalDetails,
        }))
      : []
  );
};

module.exports = {
  createBooking,
  findBookings,
};
