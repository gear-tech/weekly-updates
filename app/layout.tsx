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
        <html lang="en">
            <body className={inter.className}>{children}</body>
            <footer className="text-center pb-8 text-sm">
                <div className="max-w-6xl w-full">
                    <p>built with ❤️  by <a href="https://github.com/gear-tech">gear-tech</a> team</p>
                </div>
            </footer>
        </html>
    )
}
