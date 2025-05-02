import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CSSTransition } from "react-transition-group";
import API from "../../API/api";

dayjs.extend(utc);
dayjs.extend(timezone);

const Booking = () => {
  const Navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [setShowContent] = useState(true);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    console.log("Component mounted, fetching bookings...");
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/booking");
      console.log("Data bookings dari backend:", response.data);
      setBooking(response.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleAddBooking = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const newBooking = {
      name,
      email,
      dateTime: dayjs(selectedDateTime)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss"),
      additionalDetails,
    };

    try {
      const response = await API.post("/booking", newBooking);
      console.log("Booking response:", response.data);

      await fetchBookings();

      setName("");
      setEmail("");
      setSelectedDateTime("");
      setAdditionalDetails("");

      alert("Booking berhasil ditambahkan!");
    } catch (error) {
      console.error(
        "Error adding booking:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to add booking. Please try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <CSSTransition
            in={setShowContent}
            timeout={500}
            classNames="fade"
            unmountOnExit
            appear
          >
            <div className="row">
              <div className="col-12">
                <h2>Booking</h2>
              </div>
              <div className="col-12">
                <Link to="/home">Home</Link> |{" "}
                <Link to="/booking">Booking</Link>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>

      <div className="container my-5">
        {isLoading ? (
          <div className="loading-overlay">
            <div className="loading-box">
              <FadeLoader color="#36d7b7" loading={isLoading} size={100} />
              <p>Loading... Please wait.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {/* Booking Form */}
            <div className="col-md-6">
              <div className="location-form">
                <h3>Request a Car Wash</h3>
                <form onSubmit={handleAddBooking}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder="Preferred Time"
                      required
                      value={selectedDateTime}
                      onChange={(e) => setSelectedDateTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Additional Details"
                      rows="3"
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                    ></textarea>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="form-buttons">
                    <button type="submit" className="btn btn-custom">
                      Add Booking
                    </button>
                    <button
                      type="button"
                      className="btn btn-custom"
                      onClick={() => Navigate("/payment")}
                    >
                      Go to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Booking List */}
            <div className="col-md-6">
              <div className="booking-list">
                <h3 className="booking-title">Your Bookings</h3>
                {booking.length === 0 ? (
                  <p className="no-bookings">No bookings available.</p>
                ) : (
                  <ul className="booking-items scrollable-list">
                    {[...booking]
                      .slice(-3)
                      .reverse()
                      .map((item, index) => {
                        const isFuture = dayjs(item.dateTime).isAfter(dayjs());
                        return (
                          <li key={index} className="booking-item">
                            <div>
                              <strong>Name:</strong> {item.name}
                            </div>
                            <div>
                              <strong>Date:</strong>{" "}
                              {dayjs(item.dateTime).format("YYYY-MM-DD")}
                            </div>
                            <div>
                              <strong>Time:</strong>{" "}
                              {dayjs(item.dateTime).format("HH:mm")}
                            </div>
                            <div>
                              <strong>Status:</strong>{" "}
                              <span
                                className={`status ${
                                  isFuture ? "pending" : "done"
                                }`}
                              >
                                {isFuture ? "Pending" : "Selesai"}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
