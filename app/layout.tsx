'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
    session,
}: Readonly<{
    children: React.ReactNode;
    session: any;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <AntdRegistry>{children}</AntdRegistry>
                </SessionProvider>
            </body>
        </html>
    );
}
