import TechItem from "../TechItem";
import skillsData from "../../assets/data/skills";
// Import all images and create a mapping object
import reactIcon from "../../assets/icons/tech/React.png";
import javaScriptIcon from "../../assets/icons/tech/JavaScript.png";
import tailwindIcon from "../../assets/icons/tech/Tailwind.png";
// import nextjsIcon from "../../assets/icons/tech/Nextjs.png";
// import typescriptIcon from "../../assets/icons/tech/Typescript.png";
// import cIcon from "../../assets/icons/tech/C.png";
// import cppIcon from "../../assets/icons/tech/Cpp.png";
// import pythonIcon from "../../assets/icons/tech/Python.png";
// import sqlIcon from "../../assets/icons/tech/Sql.png";
// import dockerIcon from "../../assets/icons/tech/Docker.png";
// import linuxIcon from "../../assets/icons/tech/Linux.png";
// import expressIcon from "../../assets/icons/tech/Express.png";
// import drizzleIcon from "../../assets/icons/tech/Drizzle.png";
// import neovimIcon from "../../assets/icons/tech/Neovim.png";
// import gitIcon from "../../assets/icons/tech/Git.png";
// import assemblyIcon from "../../assets/icons/tech/Assembly.png";

const skillImages: Record<string, string> = {
	// NEXTJS: nextjsIcon,
	// TypeScript: typescriptIcon,
	// C: cIcon,
	// "C++": cppIcon,
	// Python: pythonIcon,
	// SQL: sqlIcon,
	// Docker: dockerIcon,
	// Linux: linuxIcon,
	// Express: expressIcon,
	// Drizzle: drizzleIcon,
	// Neovim: neovimIcon,
	React: reactIcon,
	JavaScript: javaScriptIcon,
	Tailwind: tailwindIcon,
	// GIT: gitIcon,
	// Assembly: assemblyIcon,
};

export default function Skills() {
	return (
		<section id='knowledge' className='sm:px-16 px-6 '>
			<h2>Knowledge & Skills</h2>
			<div id='skills-container' className='px-2 py-3 flex flex-col gap-8'>
				{Object.keys(skillsData).map((category) => (
					<div key={category}>
						<h3 className='text-xl font-semibold mb-4 text-center'>
							{category}
						</h3>
						<div className='flex flex-wrap gap-3 py-3 justify-center'>
							{skillsData[category].map(
								(skill: { name: string; alternativeTitle: string }) => (
									<TechItem
										key={skill.name}
										name={skill.name}
										alternativeTitle={skill.alternativeTitle}
										image={skillImages[skill.name]}
									/>
								)
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
