import { motion } from "framer-motion";
import CustomToolTip from "../CustomToolTip";

export default function About() {
	function saveToClipboard(e: React.MouseEvent<HTMLSpanElement>) {
		const target = e.target as HTMLSpanElement;
		let contact = target.innerHTML;

		navigator.clipboard
			.writeText(contact)
			.then(() => {
				return true;
			})
			.catch((err) => console.log("err:", err));
	}
	return (
		<motion.section
			initial={{ opacity: 0, y: 75 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.25 }}
			viewport={{ amount: "some", once: true }}
			className='sm:px-16 px-6'
			id='about'
		>
			<h2>About</h2>
			<div className='px-2'>
				<p className='sm:text-[1.3em] text-[1.1rem] text-left py-2'>
					I'm <strong>Dhruv</strong>, passionate about{" "}
					<strong>knowledge</strong>, whether it's related to{" "}
					<strong>technology</strong>, nature, the universe, or people. My
					hobbies include various forms of <strong>sports and games</strong>,
					such as football and cricket, and since I was little, I've always had
					a fascination for understanding how things work. This led me to enjoy{" "}
					<strong>engineering</strong> and getting my hands dirty to{" "}
					<strong>tinker and develop</strong>.
				</p>
				<p className='sm:text-[1.3em] text-[1.1rem] text-left py-2'>
					I am currently a student of{" "}
					<strong>Electronic and Communication Engineering</strong> (ECE) and I
					am really enjoying exploring the world of Hardware and Software. I
					have a special passion for <strong>web development and devops</strong>
					, especially creating{" "}
					<strong>system designs and architectures</strong> and coding pages
					using <strong>NEXTJS, Node.js and Express</strong>, after all, I am a
					<strong> full-stack dev</strong>. However, I am eager to learn other
					languages and technologies to have greater <strong>autonomy</strong>{" "}
					and work on both the front-end and back-end.
				</p>
				<span className='flex flex-wrap items-center'>
					<p className='sm:text-[1.3em] text-[1.1rem] text-left py-2'>
						Send an<strong> email: </strong>
					</p>
					<CustomToolTip text={"Click to copy"} textAction={"Copied!"}>
						<span
							className=' sm:text-[1.3em] text-[1.1rem] underline pointer'
							onClick={(e) => saveToClipboard(e)}
						>
							dhruvkoshta@gmail.com
						</span>
					</CustomToolTip>
				</span>
			</div>
		</motion.section>
	);
}
