import './globals.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Laura & Matthieu – Mariage',
  description: 'Site de mariage – RSVP et informations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={playfair.className}>{children}</body>
    </html>
  )
}