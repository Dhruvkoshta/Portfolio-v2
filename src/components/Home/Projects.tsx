import ProjetoItem from "./ProjectItem";
import Button from "../Button.js";

import projectsData from "../../assets/data/projectData";

import Anonymous1 from "../../assets/projects/Anonymous1.webp";
import Anonymous2 from "../../assets/projects/Anonymous2.webp";
import Anonymous3 from "../../assets/projects/Anonymous3.webp";
import webserver from "../../assets/projects/webserver.webp";
import vibelink from "../../assets/projects/VibeLink.webp";
import VibeLink2 from "../../assets/projects/VibeLink2.webp";
import Rayfall1 from "../../assets/projects/Rayfall1.png";
import iot from "../../assets/projects/iot.webp";
import ProctoAI1 from "../../assets/projects/ProctoAI1.png";

const projectImages: { [key: string]: string } = {
	"Anonymous1.webp": Anonymous1,
	"Anonymous2.webp": Anonymous2,
	"Anonymous3.webp": Anonymous3,
	"webserver.webp": webserver,
	"VibeLink.webp": vibelink,
	"VibeLink2.webp": VibeLink2,
	"Rayfall1.png": Rayfall1,
	"iot.jpg": iot,
	"ProctoAI1.png": ProctoAI1,
};

export default function Projects() {
	return (
		<>
			<section id='projects' className='sm:px-16 px-6 '>
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
