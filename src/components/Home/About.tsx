import { motion } from "framer-motion";
import CustomToolTip from "../CustomToolTip";
import { memo, useEffect, useRef, useState } from "react";

function About() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const globeRef = useRef<any>(null);
	const [userLocation, setUserLocation] = useState<[number, number] | null>(
		null,
	);

	useEffect(() => {
		let phi = 0;
		let isUnmounted = false;

		if (!canvasRef.current) return;

		import("cobe").then(({ default: createGlobe }) => {
			if (!canvasRef.current || isUnmounted) return;

			const globe = createGlobe(canvasRef.current, {
				devicePixelRatio: 2,
				width: 400 * 2,
				height: 400 * 2,
				phi: 0,
				theta: 0,
				dark: 1,
				diffuse: 1.2,
				mapSamples: 16000,
				mapBrightness: 8,
				baseColor: [0.3, 0.3, 0.3],
				markerColor: [0.1, 0.8, 1],
				glowColor: [1, 1, 1],
				opacity: 0.75,
				markers: [],
				onRender: (state) => {
					state.phi = phi;
					phi += 0.01;
				},
			});

			globeRef.current = globe;
		});

		return () => {
			isUnmounted = true;
			globeRef.current?.destroy();
		};
	}, []);

	useEffect(() => {
		if (userLocation && globeRef.current) {
			globeRef.current.update({
				markers: [{ location: userLocation, size: 0.03 }],
			});
		}
	}, [userLocation]);

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
		<div className='flex flex-col items-between sm:gap-0 gap-8 sm:flex-row '>
			<motion.section
				initial={{ opacity: 0, x: -75 }}
				whileInView={{ opacity: 1, x: 0 }}
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
						such as football and cricket, and since I was little, I've always
						had a fascination for understanding how things work. This led me to
						enjoy <strong>engineering</strong> and getting my hands dirty to{" "}
						<strong>tinker and develop</strong>.
					</p>
					<p className='sm:text-[1.3em] text-[1.1rem] text-left py-2'>
						I am currently a student of{" "}
						<strong>Electronic and Communication Engineering</strong> (ECE) and
						I am really enjoying exploring the world of Hardware and Software. I
						have a special passion for{" "}
						<strong>web development and devops</strong>, especially creating{" "}
						<strong>system designs and architectures</strong> and coding pages
						using <strong>NEXTJS, Node.js and Express</strong>, after all, I am
						a<strong> full-stack dev</strong>. However, I am eager to learn
						other languages and technologies to have greater{" "}
						<strong>autonomy</strong> and work on both the front-end and
						back-end.
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
			<motion.canvas
				initial={{ opacity: 0, x: 75 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
				viewport={{ amount: "some", once: true }}
				ref={canvasRef}
				style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
			/>
		</div>
	);
}

export default memo(About);
