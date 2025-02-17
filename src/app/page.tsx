'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Open_Sans, Nunito } from 'next/font/google';
import DeepChatComponent from '@/app/components/DeepChatComponent';
import ContextContainer from '@/app/components/ContextContainer';
import '@/app/globals.css';
import type { ContextDocument, UsageMetadata } from '@/types/aiTypes';
import { HistoryMessage } from 'deep-chat/dist/types/history';
import PrototypeMessage from './components/PrototypeMessage';
import Header from './components/Header';

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
});

const nunito = Nunito({
	subsets: ['latin'],
});

export default function Home() {
	const [contextDocs, setContextDocs] = useState<ContextDocument[]>([]);
	const [history, setHistory] = useState<HistoryMessage[]>([]);
	const [usageData, setUsageData] = useState<UsageMetadata | undefined>();

	return (
		<>
			<main className="flex flex-col items-center justify-center min-h-screen">
				<Header />
				<div className="flex flex-col gap-1 mb-6 mt-10">
					<h1
						className={`${nunito.className} text-4xl font-bold text-center`}
					>
						Ledger API Assistant
					</h1>
					<h2 className={`${openSans.className} text-lg text-center`}>
						Get help with your queries related to{' '}
						<Link
							href="https://fragment.dev/docs"
							className="text-blue-500"
							target="_blank"
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
							<DeepChatComponent
								setContextDocs={setContextDocs}
								history={history}
								setHistory={setHistory}
								setUsageData={setUsageData}
							/>
						</div>
						<div className="flex w-[50%] h-full">
							<ContextContainer
								contextDocs={contextDocs}
								usageMetadata={usageData}
							/>
						</div>
					</div>
				</div>
				<PrototypeMessage />
			</main>
		</>
	);
}
