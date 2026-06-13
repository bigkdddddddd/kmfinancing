import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder availability endpoint. Connect Google Calendar env vars to expand this into live free/busy slot checking.
  const slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
  return NextResponse.json({ ok: true, slots });
}
