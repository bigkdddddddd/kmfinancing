import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KM Financing | Home Loans & Car Loans',
  description: 'Premium finance brokerage for home loans, car loans, refinancing and asset finance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
