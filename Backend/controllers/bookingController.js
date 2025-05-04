const bookingService = require("../services/bookingService");

const getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json({
      status: "success",
      message: "List of bookings",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createBooking = async (req, res) => {
  // Frontend mengirim name, email, dateTime, additionalDetails
  const { email, dateTime, additionalDetails } = req.body;

  // Validasi input dasar
  if (!email || !dateTime) {
    return res.status(400).json({
      status: "error",
      message: "Email and dateTime are required",
    });
  }

  // Siapkan data booking untuk disimpan di sub-dokumen
  const bookingData = {
    dateTime, // Frontend sudah format YYYY-MM-DD HH:mm:ss
    additionalDetails: additionalDetails || "",
    // status bisa diset default oleh schema atau ditambahkan di sini jika perlu
  };

  try {
    // Panggil service dengan email user dan data booking
    const booking = await bookingService.createBooking(email, bookingData);

    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
};
