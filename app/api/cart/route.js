import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";



export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {deviceId, productId, name, image, price, qty, grams } = body;

    // 🔍 Check if product already exists in cart
   const existingItem = await Cart.findOne({
  productId,
  deviceId,
});

    if (existingItem) {
      // ✅ Increase quantity only
      existingItem.qty += qty ?? 1;
      await existingItem.save();

      return NextResponse.json(
        {
          success: true,
          message: "Product quantity updated in cart",
          data: existingItem,
        },
        { status: 200 }
      );
    }

    // 🆕 New product
    const cartItem = await Cart.create({
      deviceId,
      productId,
      name,
      image,
      price,              // per-item price (never changes)
      qty: qty ?? 1,
      grams: grams ?? 250,
    
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added to cart successfully",
        data: cartItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in adding to cart", error);
    return NextResponse.json(
      { success: false, message: "Error in adding to cart" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const deviceId = searchParams.get("deviceId");

  const cart = await Cart.find({ deviceId }).populate("productId");

  return Response.json(cart);
}
export async function DELETE(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id } = body;

    const deletedProduct = await Cart.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


