import { useState } from "react";

import Caricature from "../../assets/Caricature";
import GithubIcon from "../../assets/icons/contact/Github";
import LinkedinIcon from "../../assets/icons/contact/Linkedin";
import VisitIcon from "../../assets/icons/contact/Visita";
import EmailIcon from "../../assets/icons/contact/Email";
import CustomToolTip from "../CustomToolTip";
import BusinessCard from "./BusinessCard";
import { motion } from "framer-motion";

export default function Introduction({ theme }: { theme: string }) {
	const [isBusinessCardVisible, setBusinessCardVisible] = useState(false);

	return (
		<>
			{isBusinessCardVisible ? (
				<BusinessCard
					theme={theme}
					setCardVisitaVisible={setBusinessCardVisible}
				/>
			) : (
				<div className='flex max-lg:flex-col-reverse items-center justify-around px-16 py-16'>
					<motion.div
						initial={{ opacity: 0, x: -165 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.25 }}
						viewport={{ amount: "some", once: true }}
						className='  dark:text-platinum space-y-1 text-center '
					>
						<p>Hi, I'm</p>
						<h1 className=''>Dhruv</h1>
						<p>21yo software engineer from India 🇮🇳</p>
						<CustomToolTip
							text={
								<>
									Back-end by trade, devops by curiosity. I build and manage the
									entire stack.
								</>
							}
							textAction='Copied!'
						>
							<p>student</p>
						</CustomToolTip>
						<div className='flex justify-between items-center'>
							<GithubIcon
								action={() => window.open("https://github.com/Dhruvkoshta/")}
								theme={theme}
							/>
							<EmailIcon
								action={() => window.open("mailto:dhruvkoshta@gmail.com")}
								theme={theme}
							/>
							<LinkedinIcon
								action={() =>
									window.open(
										"https://www.linkedin.com/in/dhruv-koshta-15252b296/"
									)
								}
								theme={theme}
							/>
							<VisitIcon
								action={() => setBusinessCardVisible(true)}
								theme={theme}
							></VisitIcon>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 165 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.25 }}
						viewport={{ amount: "some", once: true }}
						className='sm:w-[400px] w-[100vw]'
					>
						<CustomToolTip
							text={'oil on canvas. "self-portrait".'}
							textAction='Copied!'
						>
							<Caricature theme={theme}></Caricature>
						</CustomToolTip>
					</motion.div>
				</div>
			)}
		</>
	);
}
