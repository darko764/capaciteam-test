import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  const apiUrl = `https://api.oireachtas.ie/v1/legislation?page=${page}&limit=${limit}`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  return NextResponse.json(data);
} 