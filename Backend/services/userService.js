const userRepository = require("../repositories/userRepository");
const createToken = require("../utils/createToken");
const bcrypt = require("bcrypt"); // Import bcrypt
const SALT_ROUNDS = 10; // Definisikan salt rounds

const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

const createUser = async (name, email, password) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password saat create user
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new (require("../models/Users"))({
    name,
    email,
    password: hashedPassword,
  }); // Simpan password yang sudah di-hash
  const savedUser = await userRepository.saveUser(newUser);

  const token = createToken({ id: savedUser._id, email: savedUser.email });
  return { savedUser, token };
};

const updateUser = async (id, updateData) => {
  // Hash password HANYA jika ada di updateData
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  // Panggil update ke database SETELAH potensi hashing
  const result = await userRepository.updateUserById(id, updateData);

  if (result.matchedCount === 0) {
    throw new Error("User not found");
  }
  // Ambil ulang data user tanpa password untuk dikembalikan
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
