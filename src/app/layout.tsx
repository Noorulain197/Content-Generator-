// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'AI Content Studio',
  description: 'MVP app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
