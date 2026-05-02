import properties from "@/data/properties.json";
import { formatNaira } from "@/features/listings/propertyService";

export const spacesData = properties.slice(0, 7).map((property) => ({
  id: property.id,
  categories: [property.type, property.area],
  image: property.images[0],
  date: formatNaira(property.price),
  name: property.title,
  location: `${property.area}, Lagos`,
  clientImage: property.images[1] ?? property.images[0],
  clientName:
    property.type === "Land"
      ? `${property.sqft.toLocaleString("en-NG")} sqm land`
      : `${property.beds} BD / ${property.baths} BA / ${property.sqft.toLocaleString("en-NG")} SF`,
  route: `/properties/${property.id}`,
}));
