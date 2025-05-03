const userRepository = require("../repositories/userRepository");
const createToken = require("../utils/createToken");

const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

const createUser = async (name, email, password) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const newUser = new (require("../models/Users"))({ name, email, password });
  const savedUser = await userRepository.saveUser(newUser);

  const token = createToken({ id: savedUser._id, email: savedUser.email });
  return { savedUser, token };
};

const updateUser = async (id, updateData) => {
  const result = await userRepository.updateUserById(id, updateData);
  if (result.matchedCount === 0) {
    throw new Error("User not found");
  }
  return await userRepository.findUserById(id);
};

const deleteUser = async (id) => {
  const result = await userRepository.deleteUserById(id);
  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
