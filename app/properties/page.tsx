"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/ui/back";

const dummyListings = new Array(12).fill(null).map((_, i) => ({
    id: i,
    title: `Luxury Apartment ${i + 1}`,
    price: (1000 + i * 100).toLocaleString(),
    rating: (Math.random() * 2 + 3).toFixed(1),
    location: `City ${i + 1}`,
    type: i % 2 === 0 ? "rent" : "buy",
}));


export default function ListingsPage() {
    const [mode, setMode] = useState<"rent" | "buy">("rent");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("price-low");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    const filteredListings = dummyListings
        .filter(
            (item) =>
                item.type === mode &&
                item.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const priceA = +a.price.replace(/,/g, "");
            const priceB = +b.price.replace(/,/g, "");
            return sort === "price-low" ? priceA - priceB : priceB - priceA;
        });

    const paginatedListings = filteredListings.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const totalPages = Math.ceil(filteredListings.length / perPage);

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
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedListings.map((item) => (
                    <Link key={item.id} href={`/properties/${item.id}`} className="block">
                        <Card className="overflow-hidden border shadow-md hover:shadow-lg">
                            <div className="relative h-52 w-full">
                                <Image
                                src={"https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg"}
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
                                    {item.rating}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}