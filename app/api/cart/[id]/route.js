import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
    const { action, grams } = body; // optional

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    // update qty
    if (action === "inc") cartItem.qty += 1;
    if (action === "dec") cartItem.qty = Math.max(1, cartItem.qty - 1);

    // update grams if provided
    if (grams) cartItem.grams = grams;

    await cartItem.save();

    return NextResponse.json({
      success: true,
      message: "Cart item updated",
      data: cartItem,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error updating cart" }, { status: 500 });
  }
}


