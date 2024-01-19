import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Refpath',
  description: 'Refpath project',
  openGraph: {
    siteName: 'Refpath',
    images: [
      {
        url: 'https://capybara-omega.vercel.app/favicon.ico',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refpath',
    description: 'The refpath project',
    images: ['https://capybara-omega.vercel.app/favicon.ico'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="fr">
        <body className={ cn(
            "antialiased font-sans",
            inter.className
          )}>{children}</body>
      </html>
    </SessionProvider>
  )
}