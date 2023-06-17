import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Gear Weekly Updates',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="min-h-screen text-center">
            <body className={inter.className}>{children}</body>
            <footer className="text-center p-8 text-sm">
                <div className="w-full">
                    <p>built with ❤️  by <a href="https://github.com/gear-tech">gear-tech</a> team</p>
                </div>
            </footer>
        </html>
    )
}
