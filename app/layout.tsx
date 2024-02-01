import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Emp Management Dashboard | @george5555ish',
    default: 'Emp Management Dashboard',
  },
  description: 'Emp Management Dashboard',
  metadataBase: new URL('https://nextjs-dashboard-acme.vercel.app'),
 
  keywords: ['Next.js 14', 'Emp', 'Dashboard', 'nextjs.org/learn', 'Server Actions'],
  openGraph: {
    title: 'Emp Dashboard',
    description: 'The official Next.js Learn Dashboard built with App Router.',
  
    type: 'website',
  }, 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
