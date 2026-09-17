import { NextResponse } from 'next/server';

/**
 * GET /api/ping
 * Route server-side usata dal layout per verificare che Strapi sia attivo.
 * Gira sul server dove process.env è sempre disponibile.
 */
export async function GET() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  try {
    const res = await fetch(`${strapiUrl}/api/articles?pagination[limit]=0`, {
      cache: 'no-store',
    });

    if (res.ok) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ ok: false }, { status: 503 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
