import { getFilteredProperties } from "@/features/listings/propertyService";

export function GET(request) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const listings = getFilteredProperties(params);

  return Response.json(listings);
}
