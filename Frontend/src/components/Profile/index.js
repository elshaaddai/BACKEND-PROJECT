import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(user.password || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/Users/${user._id}`);
        if (response.status === 200) {
          setUser(response.data.data); // update global state
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setPassword(response.data.data.password);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    try {
      const response = await API.put(`/Users/${user._id}`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Profile updated successfully.");
        setUser(response.data.data);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      setMessage("Error updating profile.", error);
    }
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await API.delete(`/Users/${user._id}`);
        setUser(null);
        navigate("/register");
      } catch (error) {
        alert("Gagal hapus akun.");
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="control-form"
              required
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
