import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.redirect(
    `https://oussamakader.best/carte/${id}`,
    { status: 302 }
  );
}