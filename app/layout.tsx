import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/fragments/Navbar';
import Jumbotron from './components/fragments/Jumbotron';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Terios Toast and Coffee',
    description: 'Best Coffee Shop Ever!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Jumbotron />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
