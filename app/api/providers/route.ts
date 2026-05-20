import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const metrics = await prisma.provider.findMany({
      include: {
        assignments: {
          include: {
            lead: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });
    return NextResponse.json(metrics);
  } catch (err) {
    return NextResponse.json({ error: "Failed to pull down live statistical mappings." }, { status: 500 });
  }
}