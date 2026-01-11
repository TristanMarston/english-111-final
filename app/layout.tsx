import type { Metadata } from 'next';
import { Fascinate, Nunito, Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
    variable: '--font-figtree',
    subsets: ['latin'],
    display: 'swap',
});

const fascinate = Fascinate({
    variable: '--font-fascinate',
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
});

const nunito = Nunito({
    variable: '--font-nunito',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'English 111 Final Project',
    description: 'The Song of Achilles',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={`${figtree.variable} ${fascinate.variable} ${nunito.variable}`}>
            <body className='overflow-hidden h-dvh w-dvw p-0 bg-background'>{children}</body>
        </html>
    );
}
