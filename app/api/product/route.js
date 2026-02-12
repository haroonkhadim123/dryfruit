import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: 1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const product = await Product.create({
      name: body.name,
      oldprice: body.oldprice,
      newprice: body.newprice,
      image: body.image || "https://via.placeholder.com/150", // default image if none
    });

    return NextResponse.json({ message: "Product added successfully", product }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const deletedProduct = await Product.findByIdAndDelete(body.id);

    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
