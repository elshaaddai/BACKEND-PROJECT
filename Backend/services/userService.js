const userRepository = require("../repositories/userRepository");
const createToken = require("../utils/createToken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

const createUser = async (name, email, password) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new (require("../models/Users"))({
    name,
    email,
    password: hashedPassword,
  });
  const savedUser = await userRepository.saveUser(newUser);

  const token = createToken({ id: savedUser._id, email: savedUser.email });
  return { savedUser, token };
};

const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  const result = await userRepository.updateUserById(id, updateData);

  if (result.matchedCount === 0) {
    throw new Error("User not found");
  }

  const updatedUser = await userRepository.findUserById(id).select("-password");
  return updatedUser;
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
