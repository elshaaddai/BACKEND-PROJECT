const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      status: "successful",
      message: "list users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  try {
    const { savedUser, token } = await userService.createUser(
      name,
      email,
      password
    );
    res.status(200).json({
      status: "success",
      message: "User berhasil disimpan",
      token: token,
      data: {
        _id: savedUser._id, // Gunakan _id secara konsisten
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  try {
    const updatedUser = await userService.updateUser(req.params.id, updateData);
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
