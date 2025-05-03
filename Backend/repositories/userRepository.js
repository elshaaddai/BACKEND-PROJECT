const User = require("../models/Users");

const findAllUsers = () => User.find();
const findUserByEmail = (email) => User.findOne({ email });
const findUserById = (id) => User.findById(id);
const saveUser = (user) => user.save();
const updateUserById = (id, updateData) =>
  User.updateOne({ _id: id }, { $set: updateData });
const deleteUserById = (id) => User.deleteOne({ _id: id });

module.exports = {
  findAllUsers,
  findUserByEmail,
  findUserById,
  saveUser,
  updateUserById,
  deleteUserById,
};
