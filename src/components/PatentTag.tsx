export default function PatentTag() {
	return (
		<span className='inline-flex items-center gap-1 rounded-sm border border-amber-500/70 bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-amber-800 dark:border-amber-400/60 dark:bg-amber-400/15 dark:text-amber-300'>
			<svg
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				className='h-3 w-3'
				aria-hidden='true'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
				/>
			</svg>
			Patent Granted
		</span>
	);
}
