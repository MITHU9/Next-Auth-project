import { NextResponse } from "next/server";
import connectToDB from "../../../../config/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { userName, email, password, confirmPassword } = await req.json();

  // console.log(password);
  // console.log(confirmPassword);

  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify(
        {
          error: "passwords do not match",
        },
        {
          status: 400,
        }
      )
    );
  }
  await connectToDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse(
      JSON.stringify(
        {
          error: "User already exists",
        },
        {
          status: 400,
        }
      )
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
