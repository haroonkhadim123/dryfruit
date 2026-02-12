import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password } = body;

    // check existing user
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return NextResponse.json({
        error: true,
        success: false,
        message: "Email already exists!",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const created = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: created._id,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
