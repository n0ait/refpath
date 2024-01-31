import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/theme-provider";
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Dialog } from '@/components/ui/dialog';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Refpath',
  description: 'Refpath project',
  metadataBase: new URL("https://repafth.fr"),
  openGraph: {
    siteName: 'Refpath',
    images: [
      {
        url: 'https://repafth/favicon.ico',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refpath',
    description: 'The refpath project',
    images: ['https://repafth/favicon.ico'],
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
          )}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Dialog />
              {children}
            </ThemeProvider>
          </body>
      </html>
    </SessionProvider>
  )
}