const express = require("express");
const router = express.Router();
require("./mongoose");

// Import controllers
const userController = require("./controllers/userController");
const bookingController = require("./controllers/bookingController");

// User routes
router.get("/user", userController.getUsers);
router.post("/", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

// Booking routes
router.get("/booking", bookingController.getBookings);
router.post("/booking", bookingController.createBooking);

module.exports = router;
