import { notFound } from "next/navigation";

import PropertyDetail from "@/features/listings/PropertyDetail";
import {
  getAllProperties,
  getPropertyById,
} from "@/features/listings/propertyService";
import { getNeighbourhoodData } from "@/features/neighbourhoods/neighbourhoodService";

export function generateStaticParams() {
  return getAllProperties().map((property) => ({ id: property.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = getPropertyById(id);

  return {
    title: property
      ? `${property.title} | Eco Homes Lagos`
      : "Property | Eco Homes Lagos",
  };
}

const page = async ({ params }) => {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const neighbourhood = getNeighbourhoodData(property.area);

  return <PropertyDetail property={property} neighbourhood={neighbourhood} />;
};

export default page;
