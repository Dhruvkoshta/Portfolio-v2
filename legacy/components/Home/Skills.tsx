import { memo } from "react";
import { motion } from "framer-motion";
import TechItem from "../TechItem";
import skillsData from "../../assets/data/skills";
import NextjsIcon from "../../assets/icons/tech/Next.js.svg";
import TypescriptIcon from "../../assets/icons/tech/TypeScript.svg";
import CIcon from "../../assets/icons/tech/C.svg";
import CppIcon from "../../assets/icons/tech/C++ (CPlusPlus).svg";
import PythonIcon from "../../assets/icons/tech/Python.svg";
import SqlIcon from "../../assets/icons/tech/PostgresSQL.svg";
import DockerIcon from "../../assets/icons/tech/Docker.svg";
import LinuxIcon from "../../assets/icons/tech/Linux.svg";
import ExpressIcon from "../../assets/icons/tech/Express.svg";
import DrizzleIcon from "../../assets/icons/tech/drizzle-orm.svg";
import NeovimIcon from "../../assets/icons/tech/Vim.svg";
import ReactIcon from "../../assets/icons/tech/React.svg";
import TailwindIcon from "../../assets/icons/tech/Tailwind CSS.svg";
import GitIcon from "../../assets/icons/tech/Git.svg";
import Assembly from "../../assets/icons/tech/assembly.svg";
import NodeJS from "../../assets/icons/tech/Node.js.svg";
import Nginx from "../../assets/icons/tech/NGINX.svg";

const skillImages: Record<string, string> = {
	NEXTJS: NextjsIcon,
	TypeScript: TypescriptIcon,
	C: CIcon,
	"C++": CppIcon,
	Python: PythonIcon,
	SQL: SqlIcon,
	Docker: DockerIcon,
	Linux: LinuxIcon,
	Express: ExpressIcon,
	Drizzle: DrizzleIcon,
	Neovim: NeovimIcon,
	React: ReactIcon,
	Tailwind: TailwindIcon,
	GIT: GitIcon,
	Assembly: Assembly,
	"Node JS": NodeJS,
	Nginx: Nginx,
};

function Skills() {
	return (
		<section id='knowledge' className='sm:px-16 px-6 '>
			<h2>Knowledge & Skills</h2>
			<div
				id='skills-container'
				className='px-2 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'
			>
				{Object.keys(skillsData).map((category) => (
					<motion.div
						key={category}
						className='sketch-border dark:sketch-border-dark p-4 custom-pattern1-background'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h3 className='text-xl font-semibold mb-4 text-center'>
							{category}
						</h3>
						<div className='flex flex-wrap gap-3 py-3 justify-center'>
							{skillsData[category as keyof typeof skillsData].map(
								(skill: { name: string; alternativeTitle: string }) => (
									<TechItem
										key={skill.name}
										name={skill.name}
										alternativeTitle={skill.alternativeTitle}
										image={skillImages[skill.name]}
									/>
								),
							)}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}

export default memo(Skills);
