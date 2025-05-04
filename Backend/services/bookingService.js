const bookingRepository = require("../repositories/bookingRepository");

const createBooking = async (email, bookingData) => {
  return await bookingRepository.createBooking(email, bookingData);
};

const getAllBookings = async () => {
  const bookings = await bookingRepository.findBookings();
  if (!Array.isArray(bookings)) {
    throw new Error("Bookings data is not an array");
  }
  return bookings;
};

module.exports = {
  createBooking,
  getAllBookings,
};
