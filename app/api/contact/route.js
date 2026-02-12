import dbConnect from "@/lib/db";
import Contact from "@/models/Contact"; // ✅ fixed
import { NextResponse } from "next/server";


async function sendEmail(cartItem) {
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
    subject: "New Message Received",
    text: `
A new message has been submitted .

Name: ${cartItem.name} 
Email: ${cartItem.email}
Contact: ${cartItem.phone}
Message: ${cartItem.message}

    `,
  });
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const contactItem = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
    });
    await sendEmail(contactItem)

    return NextResponse.json({
      success: true,
      error: false,
      message: "Message has been sent successfully!",
      contactItem,
    });

  } catch (error) {
    console.log("Contact POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Error in contact", error: error.message },
      { status: 500 }
    );
  }
}


