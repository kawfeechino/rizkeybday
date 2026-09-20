import type { Metadata } from 'next';
import { Fraunces, Karla, Courier_Prime } from 'next/font/google';
import './globals.css';

// Three fonts, three jobs — see the design doc's "type" section.
// next/font self-hosts these automatically: no extra network request,
// no flash of unstyled text, no layout shift.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'happy birthday',
  description: 'a small site, made for one person.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${karla.variable} ${courierPrime.variable}`}>
        {children}
      </body>
    </html>
  );
}
