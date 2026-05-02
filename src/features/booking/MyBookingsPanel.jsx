"use client";

import "./Booking.css";

import { useEffect, useState } from "react";

import { getStoredBookings } from "./bookingService";

const MyBookingsPanel = ({ refreshToken = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getStoredBookings());
  }, [refreshToken, isOpen]);

  return (
    <div className={`my-bookings ${isOpen ? "open" : ""}`}>
      <button className="my-bookings-toggle" type="button" onClick={() => setIsOpen((value) => !value)}>
        My Bookings
      </button>
      <aside className="my-bookings-panel" aria-hidden={!isOpen}>
        <div className="my-bookings-header">
          <p>Saved viewings</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="my-bookings-empty">No viewings saved yet.</p>
        ) : (
          <div className="my-bookings-list">
            {bookings.map((booking) => (
              <article key={booking.bookingRef}>
                <span>{booking.status ?? "Pending"}</span>
                <h3>{booking.propertyTitle}</h3>
                <p>{booking.bookingRef}</p>
                <p>
                  {booking.date} at {booking.time}
                </p>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};

export default MyBookingsPanel;
