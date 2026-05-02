import { getPropertyById } from "@/features/listings/propertyService";

export async function GET(_request, context) {
  const { id } = await context.params;
  const property = getPropertyById(id);

  if (!property) {
    return Response.json({ error: "Property not found" }, { status: 404 });
  }

  return Response.json(property);
}
