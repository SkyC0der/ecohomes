export const BOOKING_STORAGE_PREFIX = "ecoHomes.booking.";
export const BOOKING_TIME_ZONE = "Africa/Lagos";

export const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00", "17:00"];

const requiredFields = ["name", "email", "phone", "date", "time"];

const isObjectStorage = (storage) =>
  storage && typeof storage === "object" && typeof storage.getItem === "function";

const isMapStorage = (storage) => storage instanceof Map;

const getStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

const readStorageValue = (storage, key) => {
  if (isMapStorage(storage)) return storage.get(key) ?? null;
  if (isObjectStorage(storage)) return storage.getItem(key);
  return null;
};

const writeStorageValue = (storage, key, value) => {
  if (isMapStorage(storage)) {
    storage.set(key, value);
    return;
  }

  if (isObjectStorage(storage)) {
    storage.setItem(key, value);
  }
};

const getStorageKeys = (storage) => {
  if (isMapStorage(storage)) return Array.from(storage.keys());
  if (!isObjectStorage(storage)) return [];

  return Array.from({ length: storage.length }, (_, index) => storage.key(index));
};

const parseLocalDate = (date) => {
  if (!date) return null;
  const [year, month, day] = String(date).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day));
};

export const isValidNigerianPhone = (phone) => {
  const normalized = String(phone ?? "").replace(/[\s()-]/g, "");
  return /^(\+234|234)[789][01]\d{8}$/.test(normalized) || /^0[789][01]\d{8}$/.test(normalized);
};

export const validateBookingForm = (form = {}, { now = () => new Date() } = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!String(form[field] ?? "").trim()) {
      errors[field] = "Required";
    }
  });

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (form.phone && !isValidNigerianPhone(form.phone)) {
    errors.phone = "Enter a Nigerian phone number";
  }

  if (form.date) {
    const selected = parseLocalDate(form.date);
    const current = now();
    const today = new Date(
      Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())
    );

    if (!selected || Number.isNaN(selected.getTime())) {
      errors.date = "Choose a valid date";
    } else if (selected < today) {
      errors.date = "Choose a future date";
    } else if (selected.getUTCDay() === 0) {
      errors.date = "Sunday viewings are unavailable";
    }
  }

  if (form.time && !TIME_SLOTS.includes(form.time)) {
    errors.time = "Choose an available viewing time";
  }

  return errors;
};

export const createBookingReference = () => {
  const segment = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");
  return `REF-${segment()}-${segment()}`;
};

export const getStoredBookings = (storage = getStorage()) => {
  if (!storage) return [];

  return getStorageKeys(storage)
    .filter((key) => key?.startsWith(BOOKING_STORAGE_PREFIX))
    .map((key) => {
      try {
        return JSON.parse(readStorageValue(storage, key));
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
};

export const saveBooking = (booking, storage = getStorage()) => {
  if (!storage) return booking;

  const key = `${BOOKING_STORAGE_PREFIX}${booking.bookingRef}`;
  writeStorageValue(storage, key, JSON.stringify(booking));
  return booking;
};

export const findDuplicateBooking = (existingBookings, booking) =>
  existingBookings.find(
    (existing) =>
      existing.propertyId === booking.propertyId &&
      existing.date === booking.date &&
      existing.time === booking.time
  ) ?? null;

export const submitBooking = async (
  booking,
  {
    storage = getStorage(),
    now = () => new Date(),
    fetcher = fetch,
  } = {}
) => {
  console.info("[booking] submitting viewing request", booking.propertyId);

  const errors = validateBookingForm(booking, { now });
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const existingBookings = getStoredBookings(storage);
  const duplicate = findDuplicateBooking(existingBookings, booking);
  if (duplicate) {
    console.info("[booking] duplicate viewing request detected", duplicate.bookingRef);
    return {
      success: false,
      duplicate: true,
      bookingRef: duplicate.bookingRef,
      booking: duplicate,
      errors: {
        duplicate: "You already have this viewing time saved.",
      },
    };
  }

  const response = await fetcher("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  const body = await response.json();

  if (!response.ok || !body.success) {
    return {
      success: false,
      errors: body.errors ?? { submit: "Booking request failed" },
    };
  }

  const storedBooking = saveBooking(
    {
      ...booking,
      bookingRef: body.bookingRef,
      status: body.status ?? "Confirmed",
      createdAt: now().toISOString(),
    },
    storage
  );

  console.info("[booking] viewing request confirmed", storedBooking.bookingRef);

  return {
    ...body,
    success: true,
    bookingRef: storedBooking.bookingRef,
    booking: storedBooking,
  };
};

export const buildBookingEmail = (booking, bookingRef) => {
  const subject = `I want a Studio Eco experience like ${booking.propertyTitle}`;
  const body = [
    "Hello Studio Eco team,",
    "",
    `I liked the website enough to make it all the way to this private viewing request for ${booking.propertyTitle}. That is usually the moment a good site stops being just a site and starts becoming a sales engine.`,
    "",
    "I would like to build something with this same level of taste, trust, and conversion for my own brand.",
    "",
    `Booking reference: ${bookingRef}`,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Preferred viewing: ${booking.date} at ${booking.time}`,
    booking.message ? `Personal note: ${booking.message}` : "Personal note: I am ready to talk through the idea.",
    "",
    "Please reach out so we can shape this into something sharp.",
  ].join("\n");

  return {
    to: "hello@studioeco.co",
    subject,
    body,
    href: `mailto:hello@studioeco.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
};

const padCalendarPart = (value) => String(value).padStart(2, "0");

const formatCalendarDateTime = (date) =>
  [
    date.getUTCFullYear(),
    padCalendarPart(date.getUTCMonth() + 1),
    padCalendarPart(date.getUTCDate()),
    "T",
    padCalendarPart(date.getUTCHours()),
    padCalendarPart(date.getUTCMinutes()),
    "00",
  ].join("");

const parseBookingDateTime = (date, time) => {
  const [year, month, day] = String(date ?? "").split("-").map(Number);
  const [hour, minute] = String(time ?? "").split(":").map(Number);

  if (![year, month, day, hour, minute].every(Number.isFinite)) {
    return null;
  }

  return new Date(Date.UTC(year, month - 1, day, hour, minute));
};

export const buildGoogleCalendarUrl = (
  booking,
  { durationMinutes = 60 } = {}
) => {
  const startDate = parseBookingDateTime(booking.date, booking.time);
  if (!startDate) return "https://calendar.google.com/calendar/render";

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const bookingRef = booking.bookingRef ?? "Pending";
  const details = [
    `Booking reference: ${bookingRef}`,
    `Name: ${booking.name}`,
    `Listing: ${booking.propertyTitle}`,
    "Exact address shared after buyer verification.",
  ].join("\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Private Viewing: ${booking.propertyTitle}`,
    dates: `${formatCalendarDateTime(startDate)}/${formatCalendarDateTime(endDate)}`,
    details,
    ctz: BOOKING_TIME_ZONE,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
