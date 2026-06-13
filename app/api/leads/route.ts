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
  const form = body.form || body.contact || body;
  const record = {
    source_page: body.sourcePage || body.type || "website",
    full_name: form.fullName || form.full_name || null,
    email: form.email || null,
    phone: form.phone || null,
    message: form.message || null,
    payload: body,
    status: "new"
  };

  if (db) {
    await db.from("leads").insert(record);
    if (body.type === "callback_request") {
      await db.from("callback_requests").insert({
        full_name: record.full_name,
        phone: record.phone,
        email: record.email,
        topic: form.topic || form.purpose || null,
        message: record.message,
        source_page: record.source_page,
        payload: body,
        status: "new"
      });
    }
  }

  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: body.type === "callback_request" ? "New KM Financing callback request" : "New KM Financing website lead",
      html: `<h2>New KM Financing enquiry</h2><pre>${JSON.stringify(body, null, 2)}</pre>`
    });
    if (record.email) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: record.email,
        subject: "KM Financing received your request",
        html: `<p>Thanks for contacting KM Financing. Your request has been received.</p><p>A broker will follow up with personalised numbers.</p>`
      });
    }
  }

  return NextResponse.json({ ok: true });
}
