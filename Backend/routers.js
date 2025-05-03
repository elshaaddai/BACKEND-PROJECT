const express = require("express");
const router = express.Router();
require("./mongoose");

// Import controllers
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");

// User routes
router.get("/Users", userController.getUsers);
router.post("/Users", userController.createUser);
router.put("/Users/:id", userController.updateUser);
router.delete("/Users/:id", userController.deleteUser);

// Booking routes
router.get("/booking", bookingController.getBookings);
router.post("/booking", bookingController.createBooking);

module.exports = router;
