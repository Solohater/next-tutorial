import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = async ( { params }) => {
    const { id } = params;
  
    try {
      await connect();
  
      const post = await Post.findById(id);
  
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  
  export const DELETE = async ( { params }) => {
    const { id } = params;
  
    try {
      await connect();
  
      await Post.findByIdAndDelete(id);
  
      return new NextResponse("Post has been deleted", { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };