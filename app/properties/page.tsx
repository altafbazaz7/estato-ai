"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/ui/back";
import useDebounce from "../hooks/useDebounce";

export default function ListingsPage() {
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price-low");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 500); 

  const fetchProperties = async () => {
    setLoading(true);
    const sortOrder = sort === "price-high" ? "desc" : "asc";

    try {
      const res = await fetch(
        `/api/property?search=${encodeURIComponent(debouncedSearch)}&sort=${sortOrder}&limit=12&page=1`
      );
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [debouncedSearch, sort]);

  return (
    <div className="min-h-screen px-6 sm:px-12 py-12 max-w-7xl mx-auto">
      <BackButton />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <div className="flex gap-3">
          <Button
            variant={mode === "rent" ? "default" : "outline"}
            onClick={() => setMode("rent")}
          >
            Rent
          </Button>
          <Button
            variant={mode === "buy" ? "default" : "outline"}
            onClick={() => setMode("buy")}
          >
            Buy
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-background text-foreground border border-border rounded-md px-3 py-2 text-sm hover:ring-1 ring-ring transition"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Listings */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : properties.length === 0 ? (
        <p className="text-center">No properties found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((item: any) => (
            <Link key={item._id} href={`/properties/${item._id}`} className="block">
              <Card className="overflow-hidden border shadow-md hover:shadow-lg">
                <div className="relative h-52 w-full">
                  <Image
                    src={
                      item.imageUrl ??
                      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"
                    }
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="text-blue-600 font-bold">${item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star className="h-4 w-4 fill-yellow-500 mr-1" />
                    {item.rating ?? "4.5"}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
