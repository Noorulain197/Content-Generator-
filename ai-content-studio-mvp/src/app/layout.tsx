import './globals.css'

export const metadata = {
  title: 'AI Content Studio',
  description: 'Blogs, ads, and captions — generated fast.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">{children}</body>
    </html>
  )
}