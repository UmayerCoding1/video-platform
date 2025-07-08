import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { IVideo, Video } from "@/app/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find().sort({ createdAt: -1 });

    if (!videos || videos.length === 0) {
      return NextResponse.json({ message: "No videos found" }, { status: 404 });
    }

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.log("Video error ", error);

    return NextResponse.json(
      { error: "Faild to fetch video" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnaiUrl
    ) {
      return NextResponse.json(
        { error: "Missing requried fieldes" },
        { status: 500 }
      );
    }

 
    const videoData = {
        ...body,
        controls: body?.controls ?? true,
        transformation: {
             height : 1920,
        width : 1080,
        quality : body.transformation?.quality ?? 100
        }
    }
  const newVideo =  await Video.create(videoData);
  return NextResponse.json(newVideo, { status: 200 });
  return 
  } catch (error) {
    console.log('Video create error:', error);
    
    return NextResponse.json(
        { error: "Fieldes to create video" },
        { status: 500 }
      );
  }
}
