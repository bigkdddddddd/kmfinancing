"use client";

import { useMemo, useState } from "react";

const banks = ["CBA", "NAB", "Westpac", "ANZ", "Macquarie", "ING", "Bankwest", "Suncorp"];
const services = ["Home Loans", "Car Loans", "Refinancing", "Investment Loans", "Construction Loans", "Commercial Finance", "Debt Consolidation", "Self-Employed Lending"];
const finderTabs = ["Home loan", "Car loan", "Refinance", "Business finance"];

function money(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0);
}

function payment(p: number, r: number, y: number) {
  const m = r / 100 / 12;
  const n = y * 12;
  if (!m) return p / n;
  return p * m * Math.pow(1 + m, n) / (Math.pow(1 + m, n) - 1);
}

function LoanFinder() {
  const [tab, setTab] = useState("Home loan");
  const labels = tab === "Car loan"
    ? ["Vehicle price", "Deposit / trade-in", "Annual income"]
    : tab === "Refinance"
    ? ["Current loan amount", "Estimated property value", "Current interest rate"]
    : tab === "Business finance"
    ? ["Amount required", "Annual turnover", "Time in business"]
    : ["Purchase price", "Deposit / equity", "Annual income"];

  return <section className="finder" id="finder">
    <div className="finder-copy">
      <p className="eyebrow">Quick finance pathway</p>
      <h2>Find the right starting point in under a minute.</h2>
      <p>Choose the finance type, enter a few simple figures, then continue into the eligibility check or book a consultation.</p>
    </div>
    <div className="finder-box">
      <div className="tabbar">{finderTabs.map(item => <button key={item} onClick={() => setTab(item)} className={tab === item ? "active" : ""}>{item}</button>)}</div>
      <div className="fieldrow">
        {labels.map((label, index) => <label key={label}><span>{label}</span><input placeholder={index === 2 && tab === "Business finance" ? "Example: 2+ years" : "$"} /></label>)}
      </div>
      <div className="finder-footer"><div><strong>{tab}</strong><p>Estimated only. Final options depend on lender policy and assessment.</p></div><a href="#eligibility" className="btn">Continue</a></div>
    </div>
  </section>;
}

function Calculators() {
  const [mode, setMode] = useState("home");
  const [income, setIncome] = useState(120000);
  const [debt, setDebt] = useState(400);
  const [loan, setLoan] = useState(650000);
  const [rate, setRate] = useState(6.25);
  const [years, setYears] = useState(30);
  const [car, setCar] = useState(45000);
  const [deposit, setDeposit] = useState(5000);

  const result = useMemo(() => {
    if (mode === "home") {
      const max = income / 12 * 0.32 - debt;
      return ["Estimated borrowing power", money(Math.max(0, max / payment(1, rate, years)))];
    }
    if (mode === "car") return ["Estimated car repayment", money(payment(Math.max(0, car - deposit), rate, 5)) + " / month"];
    return ["Estimated home loan repayment", money(payment(loan, rate, years)) + " / month"];
  }, [mode, income, debt, loan, rate, years, car, deposit]);

  return <div className="calc"><div className="switch"><button onClick={() => setMode("home")} className={mode === "home" ? "on" : ""}>Borrowing Power</button><button onClick={() => setMode("car")} className={mode === "car" ? "on" : ""}>Car Loan</button><button onClick={() => setMode("repay")} className={mode === "repay" ? "on" : ""}>Repayments</button></div><div className="panel">
    {mode === "home" && <><label>Annual income<input type="number" value={income} onChange={e => setIncome(+e.target.value)} /></label><label>Monthly debts<input type="number" value={debt} onChange={e => setDebt(+e.target.value)} /></label></>}
    {mode === "car" && <><label>Vehicle price<input type="number" value={car} onChange={e => setCar(+e.target.value)} /></label><label>Deposit / trade-in<input type="number" value={deposit} onChange={e => setDeposit(+e.target.value)} /></label></>}
    {mode === "repay" && <><label>Loan amount<input type="number" value={loan} onChange={e => setLoan(+e.target.value)} /></label><label>Loan term<input type="number" value={years} onChange={e => setYears(+e.target.value)} /></label></>}
    <label>Rate assumption<input type="number" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} /></label><div className="result"><span>{result[0]}</span><strong>{result[1]}</strong><p>For a precise figure, book a free consultation.</p></div></div></div>;
}

function Eligibility() {
  const qs = [["Finance type", ["Home loan", "Car loan", "Refinance", "Investment", "Business finance", "Other"]], ["Applicant", ["Single", "Joint", "PAYG", "Self-employed"]], ["Income", ["Under $70k", "$70k-$100k", "$100k-$150k", "$150k-$220k", "$220k+"]], ["Deposit/equity", ["Under $10k", "$10k-$30k", "$30k-$75k", "$75k-$150k", "$150k+"]], ["Credit position", ["Excellent", "Good", "Average", "Some issues", "Not sure"]]];
  const [step, setStep] = useState(0), [answers, setAnswers] = useState<any>({}), [done, setDone] = useState(false);
  async function finish(e: any) { e.preventDefault(); const form = Object.fromEntries(new FormData(e.currentTarget).entries()); await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'eligibility', answers, form }) }); setDone(true); }
  if (done) return <div className="wizard"><h2>Your estimate is ready</h2><p className="big">{answers["Finance type"] === "Car loan" ? "$35,000 - $60,000" : "$450,000 - $750,000"}</p><div className="notice">Your estimate is a helpful starting point. For a precise figure based on lender policy, book a free consultation with KM Financing.</div><a href="#book" className="btn">Book Free Consultation</a></div>;
  if (step >= qs.length) return <form onSubmit={finish} className="wizard"><h2>Your borrowing power estimate is ready</h2><p>Enter your details to view and receive the estimate.</p><input name="fullName" placeholder="Full name" required /><input name="email" type="email" placeholder="Email" required /><input name="phone" placeholder="Phone" required /><textarea name="message" placeholder="Optional notes" /><button className="btn">Show My Estimate</button></form>;
  const q = qs[step]; return <div className="wizard"><div className="bar"><i style={{ width: `${(step + 1) / (qs.length + 1) * 100}%` }} /></div><h2>{q[0]}</h2><div className="opts">{(q[1] as string[]).map(o => <button key={o} onClick={() => { setAnswers({ ...answers, [q[0] as string]: o }); setStep(step + 1); }}>{o}</button>)}</div><button className="btn ghost" onClick={() => setStep(step + 1)}>Next</button></div>;
}

function Book() { async function submit(e: any) { e.preventDefault(); const form = Object.fromEntries(new FormData(e.currentTarget).entries()); await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); alert('Booking request received'); } return <form onSubmit={submit} className="card form-card"><input name="fullName" placeholder="Full name" required /><input name="email" type="email" placeholder="Email" required /><input name="phone" placeholder="Phone" required /><select name="purpose"><option>Home loan</option><option>Car loan</option><option>Refinance</option><option>Other</option></select><input name="amount" placeholder="Approx purchase price or loan amount" /><select name="mode"><option>Phone</option><option>Video</option><option>In-person</option></select><input name="date" type="date" required /><input name="time" type="time" required /><textarea name="notes" placeholder="Notes" /><button className="btn">Request Appointment</button></form>; }

export default function Home() { return <main><nav><a className="brand" href="#top"><b>KM</b><span>KM Financing</span></a><a href="#finder">Start</a><a href="#eligibility">Eligibility</a><a href="#calculators">Calculators</a><a href="#book" className="navbtn">Book</a></nav><header id="top" className="hero"><div><p className="eyebrow">Home loans • Car loans • Asset finance</p><h1>Finance made clearer for your home, car and future.</h1><p>KM Financing helps clients compare lending options, understand borrowing power and move forward with confidence.</p><a href="#finder" className="btn">Start Finance Check</a><a href="#book" className="btn light">Book a Free Consultation</a></div><aside><h3>Premium finance support</h3><p>Home loans and car loans are the main focus, with support for refinancing, investment lending, business finance and more.</p></aside></header><LoanFinder /><section className="banks">{banks.map(b => <div key={b}>{b}</div>)}</section><section><h2>Core services</h2><div className="grid">{services.map((s, i) => <article className="card" key={s}><span>{i < 2 ? 'Main service' : 'Finance option'}</span><h3>{s}</h3><p>Professional guidance, clear next steps and a simple enquiry flow.</p></article>)}</div></section><section id="eligibility" className="dark"><h2>Instant eligibility check</h2><p>A focused flow with clean tabs, simple text boxes and a final contact step before showing the estimate.</p><Eligibility /></section><section id="calculators"><h2>Calculators</h2><p>Useful finance calculators for home loans and car loans.</p><Calculators /></section><section id="book" className="dark two"><div><h2>Book a free consultation</h2><p>For a precise figure, book a free consultation.</p></div><Book /></section><section><h2>FAQs</h2><div className="grid"><article className="card"><h3>Is the estimate exact?</h3><p>No. It is a guide only. A full review is needed for a precise figure.</p></article><article className="card"><h3>Do you do car loans?</h3><p>Yes. Car loans are one of the two main services at KM Financing.</p></article><article className="card"><h3>Can I refinance?</h3><p>Yes. KM Financing can help review current loans and compare options.</p></article></div></section><footer><b>KM Financing</b><p>General information only. Update licensing, privacy and compliance details before launch.</p></footer></main>; }
