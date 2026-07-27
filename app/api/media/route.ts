import { NextRequest, NextResponse } from "next/server";
import { getMedia } from "@/lib/actions/media.actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || undefined;

  try {
    const media = await getMedia(search);
    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}