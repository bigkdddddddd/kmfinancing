import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: Request) {
  const body = await req.json();
  const db = supabase();
  const record = {
    source_page: body.type || "website",
    full_name: body.contact?.fullName || body.form?.fullName || body.contact?.full_name || null,
    email: body.contact?.email || body.form?.email || null,
    phone: body.contact?.phone || body.form?.phone || null,
    message: body.contact?.message || body.form?.message || null,
    payload: body,
    status: "new"
  };

  if (db) {
    await db.from("leads").insert(record);
  }

  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New KM Financing website lead",
      html: `<h2>New KM Financing lead</h2><pre>${JSON.stringify(body, null, 2)}</pre>`
    });
    const clientEmail = record.email;
    if (clientEmail) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: clientEmail,
        subject: "KM Financing received your enquiry",
        html: `<p>Thanks for contacting KM Financing. Your enquiry has been received.</p><p>For a precise figure, book a free consultation.</p>`
      });
    }
  }

  return NextResponse.json({ ok: true });
}
