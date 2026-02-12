import Order from "@/models/Order";
import Cart from "@/models/Cart";   // ✅ ADD THIS
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";


async function sendEmail(order) {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: "haroonkhadim23@gmail.com",
    subject: "New Order Received",
    text: `
A new Order has been submitted.

Name: ${order.firstname} ${order.lastname}
Email: ${order.email}
Contact: ${order.phone}
Address: ${order.address}
City: ${order.city}
Check your dashboard for more details.
    `,
  });
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {deviceId, firstname, lastname, email, phone, address,city, products, total } = body;
   

    // 1️⃣ CREATE ORDER
    const order = await Order.create({
 deviceId,

      firstname,
      lastname,
  email,
      phone,
      address,
      city,
      products,
      total,
      status: "Pending",
    });

    // 2️⃣ SEND EMAIL
    await sendEmail(order);

    // 3️⃣ CLEAR CART 🔥
   

await Cart.deleteMany({deviceId });


    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.log("Order error", error);
    return NextResponse.json(
      { success: false, message: "Order failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const products = await Order.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function DELETE(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id } = body;

    const deletedProduct = await Order.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: " Deleted successfully",
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
export async function PUT(request) {
  try {
    await dbConnect();

    const { id, status } = await request.json();

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


    