import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { allocateLead } from '@/lib/allocation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, serviceId, description } = body;

    if (!name || !phone || !city || !serviceId) {
      return NextResponse.json({ error: "Missing required form fields." }, { status: 400 });
    }

    // Explicit unique verification before processing
    const duplicateCheck = await prisma.lead.findUnique({
      where: { phone_serviceId: { phone, serviceId } }
    });

    if (duplicateCheck) {
      return NextResponse.json({ 
        error: "Duplicate request blocked. This phone number has already queried this service." 
      }, { status: 400 }); // Enforces duplicate rule at database level [cite: 90, 97]
    }

    // Save lead profile safely [cite: 99]
    const newLead = await prisma.lead.create({
      data: { name, phone, city, serviceId, description: description || "" }
    });

    // Run core matching algorithm inside transaction row locks [cite: 100]
    const assignedProviderIds = await allocateLead(newLead.id, serviceId);

    return NextResponse.json({ 
      success: true, 
      leadId: newLead.id, 
      assignedTo: assignedProviderIds 
    }, { status: 201 });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Duplicate entry restriction triggered at structural database levels." }, { status: 400 }); // Structural DB protection [cite: 97]
    }
    return NextResponse.json({ error: "Internal processing engine failure." }, { status: 500 });
  }
}