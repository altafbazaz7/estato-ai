import { Property } from "@/models/Property";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const property = await Property.create(data);
    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const sortOrder = searchParams.get("sort") === "desc" ? -1 : 1;

    const search = searchParams.get("search") || "";
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const properties = await Property.find(searchQuery)
      .sort({ price: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments(searchQuery);

    return NextResponse.json({
      properties,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
