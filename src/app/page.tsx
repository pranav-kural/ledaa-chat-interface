'use client';

import Link from 'next/link';
import hljs from 'highlight.js';
import { useEffect } from 'react';
import { Open_Sans, Gayathri } from 'next/font/google';
import DeepChatComponent from './components/DeepChatComponent';
import ContextContainer from './components/ContextContainer';
import './globals.css';

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
});

const gayathri = Gayathri({
	weight: '400',
	subsets: ['latin'],
});

export default function Home() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// if hljs is not already loaded, load it
			if (!window.hljs) {
				// add hljs property to window object
				window.hljs = hljs;
			}
		}
	}, []);

	return (
		<>
			<main className="flex flex-col items-center justify-center min-h-screen">
				<div className="flex flex-col gap-1 mb-3">
					<h1
						className={`${gayathri.className} text-4xl font-bold text-center`}
					>
						Ledger API Assistant
					</h1>
					<h2 className={`${openSans.className} text-lg text-center`}>
						Get help with your queries related to{' '}
						<Link
							href="https://fragment.dev/docs"
							className="text-blue-500"
						>
							Fragement&apos;s Ledger API.
						</Link>
					</h2>
				</div>
				<div className="flex flex-row items-center justify-center w-full h-[70vh] max-w-[1590px] px-20 md:px-14 sm:px-5 xs:px-3">
					<div
						className="bg-diagonal-line"
						style={{ background: '#e8f5ff' }}
					></div>
					<div className="flex flex-row items-start justify-start gap-3 h-full w-full">
						<div className="flex w-[50%] h-full">
							<DeepChatComponent />
						</div>
						<div className="flex w-[50%] h-full">
							<ContextContainer />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
