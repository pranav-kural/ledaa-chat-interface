import React from 'react';
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const geistMono = Geist_Mono({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'LEDAA - AI Assistant',
	description: 'AI assistant for Fragment Ledger API',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistMono.className} bg-neutral-100 dark:bg-black antialiased`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
