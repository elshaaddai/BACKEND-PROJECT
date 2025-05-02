const express = require("express");
const router = express.Router();
require("./mongoose");
const User = require("./Users");
const client = require("./mongodb");
const ObjectId = require("mongodb").ObjectId;
const createToken = require("./utils/createToken");

// Get All user
const Users = require("./Users");

router.get("/Users", async (req, res) => {
  const users = await Users.find();
  res.json({
    status: "succesfull",
    message: "list users",
    data: users,
  });
});

// CREATE account
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  //   kalo user tidak input nama,email,password akan return message
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }
  // jika email sudah terdaftar
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already registered",
      });
    }
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    const token = createToken({ id: savedUser._id, email: savedUser.email });

    res.status(200).json({
      status: "success",
      message: "User berhasil disimpan",
      token: token,
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// // UPDATE users
router.put("/Users/:id", async (req, res) => {
  try {
    const db = client.db("carwash");
    const { name, email, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const updateUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({
      status: "success",
      message: "user name update",
      data: updateUser,
    });
    if (updateUser) {
      delete updateUser.password;
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Error updating user",
    });
  }
});

// DELETE user
router.delete("/Users/:id", async (req, res) => {
  try {
    const db = client.db("carwash");
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// READ bookings
router.get("/booking", async (req, res) => {
  try {
    const users = await User.find({}, "name email booking");
    const bookings = users.flatMap((user) =>
      user.booking
        ? user.booking.map((booking) => ({
            userId: user._id,
            name: user.name,
            email: user.email,
            dateTime: booking.dateTime,
            additionalDetails: booking.additionalDetails,
          }))
        : []
    );
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// CREATE booking
router.post("/booking", async (req, res) => {
  try {
    const { name, email, dateTime, additionalDetails } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user.booking) {
        user.booking = [];
      }

      user.booking.push({
        dateTime,
        additionalDetails: additionalDetails || "",
      });

      const savedUser = await user.save();
      res.status(201).json({
        status: "success",
        message: "Booking added successfully",
        data: {
          userId: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          dateTime,
          additionalDetails,
        },
      });
    } catch (dbError) {
      return res.status(500).json({
        status: "error",
        message: "Database operation failed: " + dbError.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create booking: " + error.message,
    });
  }
});

module.exports = router;
