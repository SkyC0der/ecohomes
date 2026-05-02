import { describe, expect, it } from "vitest";

import {
  buildBookingEmail,
  buildGoogleCalendarUrl,
  createBookingReference,
  findDuplicateBooking,
  submitBooking,
  validateBookingForm,
} from "./bookingService";
import { POST as postBooking } from "@/app/api/bookings/route";

const validBooking = {
  propertyId: "ikoyi-waterfront-penthouse",
  propertyTitle: "Ikoyi Waterfront Penthouse",
  name: "Ada Okafor",
  email: "ada@example.com",
  phone: "+2348012345678",
  date: "2099-05-04",
  time: "11:00",
  message: "I would like a quiet morning viewing.",
};

describe("bookingService", () => {
  it("validateBookingForm returns errors for missing fields", () => {
    const errors = validateBookingForm({});

    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.date).toBeTruthy();
    expect(errors.time).toBeTruthy();
  });

  it("accepts Nigerian phone number formats", () => {
    expect(validateBookingForm({ ...validBooking, phone: "+2348012345678" }).phone)
      .toBeUndefined();
    expect(validateBookingForm({ ...validBooking, phone: "08012345678" }).phone)
      .toBeUndefined();
  });

  it("date validation rejects past dates and Sundays", () => {
    expect(validateBookingForm({ ...validBooking, date: "2020-01-01" }).date)
      .toBeTruthy();
    expect(validateBookingForm({ ...validBooking, date: "2099-05-03" }).date)
      .toBeTruthy();
  });

  it("submitBooking returns a success response with booking reference", async () => {
    const storage = new Map();
    const response = await submitBooking(validBooking, {
      storage,
      now: () => new Date("2099-05-01T10:00:00Z"),
      fetcher: async () => ({
        ok: true,
        json: async () => ({ success: true, bookingRef: "REF-1234-ABCD" }),
      }),
    });

    expect(response.success).toBe(true);
    expect(response.bookingRef).toMatch(/^REF-/);
    expect(storage.size).toBe(1);
  });

  it("detects duplicate bookings for the same property, date, and time slot", () => {
    const existing = [{ ...validBooking, bookingRef: createBookingReference() }];

    expect(findDuplicateBooking(existing, validBooking)).toBeTruthy();
  });

  it("POST /api/bookings returns a mock success booking reference", async () => {
    const response = await postBooking(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        body: JSON.stringify(validBooking),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.bookingRef).toMatch(/^REF-/);
  });

  it("buildBookingEmail creates a personable Studio Eco inquiry", () => {
    const email = buildBookingEmail(validBooking, "REF-1234-ABCD");

    expect(email.href).toContain("mailto:hello@studioeco.co");
    expect(decodeURIComponent(email.href)).toContain("Ikoyi Waterfront Penthouse");
    expect(decodeURIComponent(email.href)).toContain(
      "I liked the website enough to make it all the way to this private viewing request"
    );
  });

  it("buildGoogleCalendarUrl creates a private viewing calendar event", () => {
    const url = buildGoogleCalendarUrl({
      ...validBooking,
      bookingRef: "REF-1234-ABCD",
    });
    const searchParams = new URL(url).searchParams;

    expect(url).toContain("https://calendar.google.com/calendar/render?");
    expect(searchParams.get("text")).toBe(
      "Private Viewing: Ikoyi Waterfront Penthouse"
    );
    expect(searchParams.get("dates")).toBe(
      "20990504T110000/20990504T120000"
    );
    expect(searchParams.get("ctz")).toBe("Africa/Lagos");
    expect(searchParams.get("details")).toContain(
      "Exact address shared after buyer verification."
    );
  });
});
