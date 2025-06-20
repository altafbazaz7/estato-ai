// app/listings/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/ui/back";

const dummyListings = new Array(12).fill(null).map((_, i) => ({
  id: i, 
  title: `Luxury Apartment ${i + 1}`,
  price: (1000 + i * 100).toLocaleString(),
  rating: (Math.random() * 2 + 3).toFixed(1),
  location: `City ${i + 1}`,
  type: i % 2 === 0 ? "rent" : "buy",
  image: `https://images.pexels.com/photos/${1016159 + i}/pexels-photo-${1016159 + i}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`, // sample Pexels image
}));

export default function ListingPage({ params }: { params: { id: string | number } }) {
  const listing = dummyListings.find((item) => item.id === params.id);
  if (!listing) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <BackButton />

      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      <div className="relative h-80 w-full mb-6 rounded overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-lg font-semibold text-primary mb-2">${listing.price}</p>
      <p className="text-muted-foreground mb-2">{listing.location}</p>
      <p className="text-sm text-yellow-500">⭐ {listing.rating}</p>
    </div>
  );
}
