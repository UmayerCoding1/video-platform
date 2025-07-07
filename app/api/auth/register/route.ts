import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/User";


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
  
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
  
    await connectToDatabase();
  
    const existingUser = await User.findOne({email});
  
  
    if (existingUser) {
      return NextResponse.json(
        { error: "User allready register" },
        { status: 400 }
      );
    }
  
    await User.create({
          email,password
      }) 
  
      return NextResponse.json(
          {message: "User Register successfully"},
          {status: 200}
      )
  } catch (error) {
    console.log("registretion eror",error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
    
  }
}
