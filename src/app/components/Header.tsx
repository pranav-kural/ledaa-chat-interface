export default function Header({ className }: { className?: string }) {
	return (
		<header
			className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
		>
			<span className="">Ledger API AI Assistant</span>
		</header>
	);
}
