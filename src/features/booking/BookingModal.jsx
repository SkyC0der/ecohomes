"use client";

import "./Booking.css";

import { useMemo, useState } from "react";

import BookingConfirmation from "./BookingConfirmation";
import { TIME_SLOTS, submitBooking, validateBookingForm } from "./bookingService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "09:00",
  message: "",
};

const BookingModal = ({ property, isOpen, onClose, onBookingSaved }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const title = property?.title ?? "";

  const formWithProperty = useMemo(
    () => ({
      ...form,
      propertyId: property?.id,
      propertyTitle: property?.title,
    }),
    [form, property]
  );

  if (!isOpen || !property) return null;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateBookingForm(formWithProperty);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    const response = await submitBooking(formWithProperty);
    setIsSubmitting(false);

    if (!response.success) {
      setErrors(response.errors ?? { submit: "Unable to confirm this request." });
      if (response.duplicate && response.booking) {
        setConfirmedBooking(response.booking);
      }
      return;
    }

    setConfirmedBooking(response.booking);
    onBookingSaved?.();
  };

  const closeModal = () => {
    setForm(initialForm);
    setErrors({});
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="booking-modal-backdrop" role="presentation">
      <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="booking-modal-close" type="button" onClick={closeModal}>
          Close
        </button>
        {confirmedBooking ? (
          <BookingConfirmation booking={confirmedBooking} />
        ) : (
          <>
            <div className="booking-modal-header">
              <p>Private viewing</p>
              <h3 id="booking-title">{title}</h3>
            </div>
            <form onSubmit={handleSubmit} className="booking-form">
              <label>
                Full name
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? <span>{errors.name}</span> : null}
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <span>{errors.email}</span> : null}
              </label>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+2348012345678"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? <span>{errors.phone}</span> : null}
              </label>
              <div className="booking-form-row">
                <label>
                  Preferred date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    aria-invalid={Boolean(errors.date)}
                  />
                  {errors.date ? <span>{errors.date}</span> : null}
                </label>
                <label>
                  Time slot
                  <select
                    value={form.time}
                    onChange={(event) => updateField("time", event.target.value)}
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time ? <span>{errors.time}</span> : null}
                </label>
              </div>
              <label>
                Message
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  rows="4"
                  placeholder="Tell us what would make this viewing useful."
                />
              </label>
              {errors.duplicate || errors.submit ? (
                <p className="booking-form-error">{errors.duplicate || errors.submit}</p>
              ) : null}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Confirming..." : "Confirm Viewing Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
