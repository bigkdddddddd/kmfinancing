"use client";

import Link from "next/link";
import { useState } from "react";

export const serviceLinks = [
  { href: "/home-loans", label: "Home Loans" },
  { href: "/car-loans", label: "Car Loans" },
  { href: "/refinance", label: "Refinance" },
  { href: "/business-finance", label: "Business Finance" }
];

export function TopNav() {
  return <nav><Link className="brand" href="/"><b>KM</b><span>KM Financing</span></Link>{serviceLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}<Link href="/#eligibility">Eligibility</Link><Link href="/#calculators">Calculators</Link><Link href="/#callback" className="navbtn">Request Callback</Link></nav>;
}

export function Footer() {
  return <footer><b>KM Financing</b><p>General information only. Calculator outputs and estimates are guides, not approvals. Update licensing, credit representative and privacy details before launch.</p></footer>;
}

export function CallbackBox({ topic = "", sourcePage = "website" }: { topic?: string; sourcePage?: string }) {
  const [sent, setSent] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "callback_request", sourcePage, form }) });
    setSent(true);
  }
  if (sent) return <div className="callback-box"><h2>Request received</h2><p>A broker will follow up with personalised numbers.</p><div className="notice">For a precise figure, KM Financing will review your situation and lender policy.</div></div>;
  return <form className="callback-box" onSubmit={submit}>
    <h2>Get a tailored estimate</h2>
    <p>A broker will follow up with personalised numbers.</p>
    <div className="callback-grid two-cols">
      <label><span>Full name</span><input name="fullName" placeholder="Jane Doe" required /></label>
      <label><span>Phone</span><input name="phone" placeholder="04xx xxx xxx" required /></label>
    </div>
    <label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label>
    <label><span>What can we help with?</span><select name="topic" defaultValue={topic}><option value="">Choose a topic</option><option>Home loan</option><option>Car loan</option><option>Refinance</option><option>Business finance</option><option>Investment loan</option><option>Other finance</option></select></label>
    <label><span>Message (optional)</span><textarea name="message" placeholder="Tell us a little about your situation..." /></label>
    <button className="callback-button">Request callback</button>
    <small>By submitting, you agree to our privacy policy. We'll never share your details.</small>
  </form>;
}

export function CallbackSection({ topic, sourcePage }: { topic?: string; sourcePage?: string }) {
  return <section id="callback" className="callback-section"><CallbackBox topic={topic} sourcePage={sourcePage} /></section>;
}

export function ServicePage({ eyebrow, title, intro, bullets, topic, sourcePage }: { eyebrow: string; title: string; intro: string; bullets: string[]; topic: string; sourcePage: string }) {
  return <main><TopNav /><header className="service-hero"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p><div className="service-actions"><Link href="#callback" className="btn">Get tailored estimate</Link><Link href="/" className="btn light">Back home</Link></div></div><aside><h3>Clear finance guidance</h3><p>Simple numbers, clean next steps and a follow-up from KM Financing for a more precise figure.</p></aside></header><section><h2>What this page helps with</h2><div className="grid three">{bullets.map(item => <article className="card" key={item}><span>{topic}</span><h3>{item}</h3><p>Get a cleaner starting point before choosing the next step.</p></article>)}</div></section><CallbackSection topic={topic} sourcePage={sourcePage} /><Footer /></main>;
}
