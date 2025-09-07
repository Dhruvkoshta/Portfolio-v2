import ProjetoItem from "./ProjectItem";
import Button from "../Button.js";

import projectsData from "../../assets/data/projectData";

import minimiza from "../../assets/projects/minimizeai.webp";
import minimiza1 from "../../assets/projects/minimizeai1.webp";

import puclove from "../../assets/projects/puclove.webp";
import puclove1 from "../../assets/projects/puclove1.webp";
import puclove2 from "../../assets/projects/puclove2.webp";

const projectImages: { [key: string]: string } = {
	"minimizeai.webp": minimiza,
	"minimizeai1.webp": minimiza1,
	"puclove.webp": puclove,
	"puclove1.webp": puclove1,
	"puclove2.webp": puclove2,
};

export default function Projects() {
	return (
		<>
			<section id='projects' className='sm:px-16 px-6'>
				<h2>Projects</h2>
				<div id='' className='flex flex-wrap gap-12 py-3 px-2 justify-center'>
					{projectsData.map((project) => (
						<ProjetoItem
							key={project.title}
							title={project.title}
							text={project.text}
							githubURL={project.githubURL}
							websiteURL={project.websiteURL}
							initialImage={projectImages[project.initialImageName]}
							images={project.imageNames.map(
								(imageName) => projectImages[imageName]
							)}
							devProgress={project.devProgress}
							tags={project.tags}
						/>
					))}
				</div>
			</section>
			<div className=' flex justify-center w-[100%] h-16'>
				<Button
					content={"See more on GitHub"}
					action={() => window.open("https://github.com/dhruvkoshta/")}
				></Button>
			</div>
		</>
	);
}
