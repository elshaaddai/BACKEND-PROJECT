import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    console.log(`Attempting to update user with ID: ${user?._id}`);
    try {
      const updateData = {
        name,
        email,
      };
      if (newPassword) {
        updateData.password = newPassword;
      }

      const response = await API.put(`/update/${user._id}`, updateData);

      if (response.status === 200) {
        setMessage("Profile updated successfully.");
        setNewPassword("");
        setUser(response.data.data);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      setMessage(Error`updating profile: ${errorMsg}`);
      console.error("Update Profile Error:", error.response || error);
    }
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        console.log(`Attempting to delete user with ID: ${user?._id}`);
        await API.delete(`/delete/${user._id}`);
        setUser(null);
        navigate("/register");
      } catch (error) {
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred.";
        setMessage(Error`deleting account: ${errorMsg}`);
        console.error("Delete Account Error:", error.response || error);
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2 className="profile-title">Profile</h2>

        {message && <p className="profile-message">{message}</p>}

        <form onSubmit={handleUpdate}>
          <div className="profile-field">
            <label className="profile-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="control-form"
              required
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label className="profile-label">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="control-form"
              required
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label className="profile-label">Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="control-form"
              disabled={!isEditing}
            />
          </div>

          <button type="submit" className="btn-login btn-login-custom">
            {isEditing ? "Simpan" : "Edit Profile"}
          </button>
        </form>

        <button
          className="btn-login btn-login-custom delete-btn"
          onClick={handleDelete}
        >
          {confirmDelete ? "Confirm Delete Account" : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
