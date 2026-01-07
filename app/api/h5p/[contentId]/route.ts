import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { contentId: string } }
) {
  try {
    const h5pData = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/h5p/play/${params.contentId}`
    );

    if (!h5pData.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch H5P content' },
        { status: h5pData.status }
      );
    }

    const data = await h5pData.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
