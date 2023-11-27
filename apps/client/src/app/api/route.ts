// frontend/src/app/route.ts

// export async function GET(request: Request) {}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'API Running' });
}
