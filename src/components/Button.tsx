export default function Button({
	content,
	action,
}: {
	content: string;
	action: () => void;
}) {
	return (
		<button
			onClick={action}
			type='button'
			className='sketch-border dark:sketch-border-dark pointer hover:bg-jet dark:hover:bg-platinum dark:hover:text-jet hover:text-platinum max-w-[500px]'
		>
			{content}
		</button>
	);
}
