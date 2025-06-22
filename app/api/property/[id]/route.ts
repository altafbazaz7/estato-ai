import { Property } from '@/models/Property';
import { connectToDB } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: any) {
  try {
    await connectToDB();
    const property = await Property.findById(params.id);
    return NextResponse.json(property);
  } catch {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    await connectToDB();
    const body = await req.json();
    const updated = await Property.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: any) {
  try {
    await connectToDB();
    await Property.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
