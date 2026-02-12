import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

export async function POST(req){
    try {
        await dbConnect();
        const body=await req.json();
        const{name,comment}=body;
        const review=await Comment.create({
            name,
            comment,
        })
        return NextResponse.json({success:true,error:false,message:"Review submitted successfully!",review})
        
    } catch (error) {
        console.log("Comment POST Error:", error);
            return NextResponse.json(
              { success: false, message: "Error in comment", error: error.message },
              { status: 500 }
            );

        
    }
}
export async function GET() {
  try {
    await dbConnect();

    const reviewitem = await Comment.find();

    return Response.json(
      { success: true, reviewitem },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching Review", error);
    return NextResponse.json(
      { success: false, message: "Error in fetching review" },
      { status: 500 }
    );
  }
}
