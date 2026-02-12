import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET() {
  await dbConnect();
  const products = await Product.find().limit(8);

  return NextResponse.json({
    success: true,
    products,
  });
}

