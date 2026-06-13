import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function createGoogleEvent(data: any) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) return null;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token"
    })
  });
  const token = await tokenRes.json();
  if (!token.access_token) return null;
  const timezone = process.env.GOOGLE_TIMEZONE || "Australia/Melbourne";
  const start = `${data.date}T${data.time}:00`;
  const endDate = new Date(start);
  endDate.setMinutes(endDate.getMinutes() + 45);
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const eventRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: `KM Financing consultation - ${data.fullName || "Client"}`,
      description: JSON.stringify(data, null, 2),
      start: { dateTime: start, timeZone: timezone },
      end: { dateTime: endDate.toISOString(), timeZone: timezone }
    })
  });
  return eventRes.json();
}

export async function POST(req: Request) {
  const body = await req.json();
  const db = supabase();
  if (db) await db.from("appointments").insert({ full_name: body.fullName, email: body.email, phone: body.phone, loan_purpose: body.purpose, preferred_date: body.date, preferred_time: body.time, payload: body, status: "requested" });
  const event = await createGoogleEvent(body).catch(() => null);
  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL && process.env.FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: process.env.FROM_EMAIL, to: process.env.ADMIN_EMAIL, subject: "New KM Financing appointment request", html: `<pre>${JSON.stringify(body, null, 2)}</pre>` });
    if (body.email) await resend.emails.send({ from: process.env.FROM_EMAIL, to: body.email, subject: "KM Financing appointment request received", html: `<p>Your appointment request has been received.</p><p>For a precise figure, book a free consultation with KM Financing.</p>` });
  }
  return NextResponse.json({ ok: true, event });
}
