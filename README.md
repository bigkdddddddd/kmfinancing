# KM Financing Website

Premium, conversion-focused finance brokerage website for **KM Financing**, built with Next.js, Supabase, Resend, Google Calendar, and Netlify deployment support.

The site focuses primarily on **home loans** and **car loans**, while also supporting refinancing, investment loans, construction loans, commercial finance, debt consolidation, self-employed lending, and other asset finance.

## Included

- Responsive premium finance website
- Mortgage-flow-style tabbed finance finder
- Clean text-box panels and segmented tabs
- Eligibility check flow
- Home loan and car loan calculators
- Supabase data handling for leads, eligibility checks, calculator results, contact messages, and appointments
- Resend email notifications and confirmations
- Google Calendar appointment creation structure
- Netlify-ready configuration

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

Supabase project already created:

```txt
Project ID: neymtndukowsluwxetgs
Project URL: https://neymtndukowsluwxetgs.supabase.co
```

Tables created:

- leads
- appointments
- calculator_results
- contact_messages

Add the Supabase environment variables in Netlify.

## Deploy to Netlify

1. Go to Netlify.
2. Add new site from Git.
3. Choose this GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Netlify will use `netlify.toml` and `@netlify/plugin-nextjs`.
7. Add environment variables from `.env.example`.
8. Deploy.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://neymtndukowsluwxetgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=
ADMIN_EMAIL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=primary
GOOGLE_TIMEZONE=Australia/Melbourne
```

## Compliance placeholders

This site includes general placeholder wording for finance and lending disclaimers. Before going live, update all licensing, credit representative, privacy, and compliance details with the correct business information and professional advice.
