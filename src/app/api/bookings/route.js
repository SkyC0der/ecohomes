import {
  createBookingReference,
  validateBookingForm,
} from "@/features/booking/bookingService";

export async function POST(request) {
  const booking = await request.json();
  const errors = validateBookingForm(booking);

  if (Object.keys(errors).length > 0) {
    return Response.json({ success: false, errors }, { status: 400 });
  }

  return Response.json(
    {
      success: true,
      status: "Confirmed",
      bookingRef: createBookingReference(),
    },
    { status: 201 }
  );
}
