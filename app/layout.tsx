import type { Metadata } from 'next';
import './globals.css';
import ClientShell from './ClientShell';

export const metadata: Metadata = {
  title: 'CampusOS - City University | Unified Academic & Student Services Portal',
  description: 'Official unified academic operations and student platform for City University, Dhaka (Permanent Campus, Birulia, Savar). Built with Oxford Academic aesthetic standards.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#002147] selection:text-white">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
