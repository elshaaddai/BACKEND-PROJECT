const bookingRepository = require("../repositories/bookingRepository");

const createBooking = async (email, bookingData) => {
  return await bookingRepository.createBooking(email, bookingData);
};

const getAllBookings = async () => {
  return await bookingRepository.findBookings();
};

module.exports = {
  createBooking,
  getAllBookings,
};
