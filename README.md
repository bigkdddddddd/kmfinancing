# KM Financing Website

Premium, conversion-focused finance brokerage website for **KM Financing**, built with Next.js, Supabase, Resend, and Google Calendar.

The site focuses primarily on **home loans** and **car loans**, while also supporting refinancing, investment loans, construction loans, commercial finance, debt consolidation, self-employed lending, and other asset finance.

## Included

- Responsive premium finance website
- Home page, About, Services, Home Loans, Car Loans, Calculators, Eligibility Check, Booking, Testimonials, FAQ, Contact, Resources
- Dedicated lead-gated eligibility/borrowing power landing page
- Home loan and car loan calculators
- Supabase data handling for leads, eligibility checks, calculator results, contact messages, and appointments
- Resend email notifications and confirmations
- Google Calendar availability checking and event creation
- Editable CMS-like data files for services, testimonials, FAQs, resources, and lender placeholders
- Supabase SQL schema
- Environment variable example file
- Vercel-ready project structure

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a new Supabase project.
2. Go to **SQL Editor**.
3. Run the SQL in `supabase/schema.sql`.
4. Add your Supabase keys to `.env.local`.

Use the service role key only on the server side. Do not expose it publicly.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.

## Compliance placeholders

This site includes general placeholder wording for finance and lending disclaimers. Before going live, update all licensing, credit representative, privacy, and compliance details with the correct business information and professional advice.
