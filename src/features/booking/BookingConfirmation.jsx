"use client";

import {
  buildBookingEmail,
  buildGoogleCalendarUrl,
} from "./bookingService";

const BookingConfirmation = ({ booking }) => {
  if (!booking) return null;

  const email = buildBookingEmail(booking, booking.bookingRef);
  const calendarUrl = buildGoogleCalendarUrl(booking);

  return (
    <div className="booking-confirmation">
      <div className="booking-confirmation-mark" aria-hidden="true">
        <span></span>
      </div>
      <p>Viewing request confirmed</p>
      <h3 id="booking-title">{booking.bookingRef}</h3>
      <div className="booking-confirmation-summary">
        <p>{booking.propertyTitle}</p>
        <p>
          {booking.date} at {booking.time}
        </p>
        <p>{booking.name}</p>
      </div>
      <div className="booking-confirmation-actions">
        <a href={calendarUrl} target="_blank" rel="noreferrer">
          Add to Google Calendar
        </a>
        <a href={email.href}>Send Inquiry Email</a>
      </div>
    </div>
  );
};

export default BookingConfirmation;
