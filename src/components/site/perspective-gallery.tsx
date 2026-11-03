import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "~/lib/use-reduced-motion";

const UNSPLASH_IMAGES = [
	"https://cdn.21st.dev/assets/mirror/a9/a9c2900d44fe6288b344f447cb12a05f7e64c439479a8ccb977d3b20eb371156.jpg",
	"https://cdn.21st.dev/assets/mirror/29/29cf6ad39eb198c05b8d915fca0becfd3d270d510d32eaec1b886c426c681c67.jpg",
	"https://cdn.21st.dev/assets/mirror/61/6154958e9df110914005256ff2319d43a2c2e0fc8bb54e9f8bce7b91fdce5df1.jpg",
	"https://cdn.21st.dev/assets/mirror/6d/6db92aff3c02cce69e2c672a6dd4e99cbf5c55d68fbf08c460527e6c7c5b64ba.jpg",
	"https://cdn.21st.dev/assets/mirror/42/42ad2d0680dba697d578434e5af5620c7ab1c7c55bc36cec3b55eec8b7a79cbf.jpg",
	"https://cdn.21st.dev/assets/mirror/cd/cd3dc09b1bbed97cfc879e2c5e62fdbc68dc4070b6105e476410d70e31d1e459.jpg",
	"https://cdn.21st.dev/assets/mirror/02/0232d63e3e0cb8d3599a77e29f87f8ec4b9fadfd031592296b3f19a730a5348c.jpg",
	"https://cdn.21st.dev/assets/mirror/56/562b212caa6ec06d8b0b313660dac6aa0bbfb729092cc4f16d04558a319af6b1.jpg",
	"https://cdn.21st.dev/assets/mirror/02/02cbcd62720734d469f2ea8e5ed7a212e18cb05e73457445b4d755ad0ae1fcd8.jpg",
	"https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80",
	"https://cdn.21st.dev/assets/mirror/c4/c42df7c9c444a1189dad0570c0d01986454cd6a10eaf253a9ab40eb921a5bae5.jpg",
	"https://cdn.21st.dev/assets/mirror/27/275fbf3f84c5258c7a8235a8a47022f847d0f408c950288c532aefa83d072a2c.jpg",
	"https://cdn.21st.dev/assets/mirror/7e/7e2fb073870b2f578a37a693b1e0c9402a98201149509b54da2f86a2ee6abf5e.jpg",
	"https://cdn.21st.dev/assets/mirror/3d/3d74651780292fb5a2ba23e525d9d09860bb83fbfafc7ede17b8e3662d7b1022.jpg",
];

interface ImageCardProps {
	src: string;
	onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
	return (
		<div className="perspective-gallery__card will-change-transform backface-hidden preserve-3d">
			<img
				alt="Gallery asset"
				className="perspective-gallery__image"
				loading="lazy"
				onLoad={onLoad}
				src={src}
			/>
		</div>
	);
};

export function PerspectiveGallery() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isReady, setIsReady] = useState(false);
	const [mounted, setMounted] = useState(false);
	const loadedCountRef = useRef(0);
	const reducedMotion = useReducedMotion();

	const handleItemLoad = useCallback(() => {
		loadedCountRef.current += 1;
		if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
	}, [isReady]);

	useEffect(() => {
		setMounted(true);
		const t = setTimeout(() => setIsReady(true), 1200);
		return () => clearTimeout(t);
	}, []);

	const colMedia = useMemo(() => {
		const col1Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 0);
		const col2Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 1);
		const col3Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 2);
		const col4Base = UNSPLASH_IMAGES.filter((_, i) => i % 4 === 3);

		return {
			col1: [...col1Base, ...col1Base],
			col2: [...col2Base, ...col2Base],
			col3: [...col3Base, ...col3Base],
			col4: [...col4Base, ...col4Base],
		};
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 20,
		mass: 0.5,
	});

	// Banner animations
	const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
	const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
	const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
	const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

	// 3D Matrix animations
	const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
	const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
	const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
	const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

	// Track columns parallax animations
	const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
	const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
	const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
	const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

	if (!mounted || reducedMotion) {
		return (
			<section
				aria-label="3D Perspective Gallery"
				className="perspective-gallery-static"
				id="gallery"
			>
				<div className="perspective-gallery-static__grid">
					{UNSPLASH_IMAGES.slice(0, 8).map((src, index) => (
						<div className="perspective-gallery__card" key={`static-${index}`}>
							<img
								alt="Gallery asset"
								className="perspective-gallery__image"
								loading="lazy"
								src={src}
							/>
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section
			aria-label="3D Perspective Gallery"
			className="perspective-gallery-track"
			id="gallery"
			ref={containerRef}
		>
			<div className="perspective-gallery-sticky">
				<motion.div
					className="perspective-gallery-banner will-change-transform backface-hidden preserve-3d"
					style={{
						width: bannerWidth,
						height: bannerHeight,
						borderRadius: bannerRadius,
						borderWidth: bannerBorderWidth,
						borderColor: "#2c2738",
					}}
				>
					<div
						className="perspective-gallery-stage"
						style={{ perspective: "1000px" }}
					>
						{/* Ambient Shadow Box Masking */}
						<div
							aria-hidden="true"
							className="perspective-gallery-vignette perspective-gallery-vignette--vertical"
						/>
						<div
							aria-hidden="true"
							className="perspective-gallery-vignette perspective-gallery-vignette--horizontal"
						/>

						{/* Parallax Image Grid Matrix */}
						<motion.div
							className="perspective-gallery-matrix will-change-transform backface-hidden"
							style={{
								rotateX,
								rotateY,
								rotateZ,
								z: translateZ,
								transformStyle: "preserve-3d",
							}}
						>
							<motion.div
								className="perspective-gallery-col"
								style={{ y: yCol1 }}
							>
								{colMedia.col1.map((src, index) => (
									<ImageCard
										key={`col1-${index}`}
										onLoad={handleItemLoad}
										src={src}
									/>
								))}
							</motion.div>

							<motion.div
								className="perspective-gallery-col"
								style={{ y: yCol2 }}
							>
								{colMedia.col2.map((src, index) => (
									<ImageCard
										key={`col2-${index}`}
										onLoad={handleItemLoad}
										src={src}
									/>
								))}
							</motion.div>

							<motion.div
								className="perspective-gallery-col"
								style={{ y: yCol3 }}
							>
								{colMedia.col3.map((src, index) => (
									<ImageCard
										key={`col3-${index}`}
										onLoad={handleItemLoad}
										src={src}
									/>
								))}
							</motion.div>

							<motion.div
								className="perspective-gallery-col"
								style={{ y: yCol4 }}
							>
								{colMedia.col4.map((src, index) => (
									<ImageCard
										key={`col4-${index}`}
										onLoad={handleItemLoad}
										src={src}
									/>
								))}
							</motion.div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
