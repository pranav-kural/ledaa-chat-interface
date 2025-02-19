'use client';

import { useState } from 'react';
import { HistoryMessage } from 'deep-chat/dist/types/history';
import DeepChatComponent from '@/app/components/DeepChatComponent';
import ContextContainer from '@/app/components/ContextContainer';
import PrototypeMessage from '@/app/components/PrototypeMessage';
import Header from '@/app/components/Header';
import type { ContextDocument, UsageMetadata } from '@/types/aiTypes';
import '@/app/globals.css';

export default function Home() {
	const [contextDocs, setContextDocs] = useState<ContextDocument[]>([]);
	const [history, setHistory] = useState<HistoryMessage[]>([]);
	const [usageData, setUsageData] = useState<UsageMetadata | undefined>();

	return (
		<>
			<main className="flex flex-col items-center justify-center min-h-screen">
				<Header />

				<div className="flex flex-row items-center justify-center w-full xl:h-[70vh] min-h-[70vh] max-w-[1590px] xl:px-20 md:px-14 sm:px-5 px-3">
					<div
						className="bg-diagonal-line"
						style={{ background: '#e8f5ff' }}
					></div>
					<div className="flex flex-col xl:flex-row items-start justify-start gap-3 h-full w-full">
						<div className="flex w-full xl:w-[50%] h-full">
							<DeepChatComponent
								setContextDocs={setContextDocs}
								history={history}
								setHistory={setHistory}
								setUsageData={setUsageData}
							/>
						</div>
						<div className="flex w-full xl:w-[50%] h-full">
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
