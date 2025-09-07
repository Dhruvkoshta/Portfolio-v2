import { useState } from "react";
import Menu from "../assets/icons/buttons/MenuIcon";
import Switch from "../assets/icons/buttons/SwitchIcon";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar({
	setTheme,
	theme,
}: {
	setTheme: (theme: string) => void;
	theme: string;
}) {
	const [showMenu, setShowMenu] = useState(false);

	function openMenu() {
		const menuMobile = document.getElementById("menuMobile");
		if (menuMobile) {
			if (showMenu) {
				menuMobile.style.display = "none";
			} else {
				menuMobile.style.display = "block";
			}
		}
		setShowMenu(!showMenu);
	}

	return (
		<header className='max-w-[1240px] justify-around flex relative left-0 top-0 py-4 '>
			<div className='overflow-hidden justify-end flex group'>
				<a href='\'>
					<p className='pointer p-2 lg:text-[2.5rem] text-[1.5rem] font-augustina dark:text-platinum text-jet'>
						Dhruv Koshta
					</p>
				</a>
			</div>

			<div className=' px-6 flex justify-between'>
				<div className=' overflow-hidden  align-middle max-md:hidden flex '>
					<ul className='flex  text-center items-center gap-1 '>
						<li className=' transition-opacity animate-bounce px-3 text-[1.2rem] group hover:bg-jet dark:bg-platinum'>
							<HashLink
								className='pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet '
								to='/blog'
							>
								Blog
							</HashLink>
						</li>
						<li className='px-3 text-[1.2rem] group hover:bg-jet dark:hover:bg-platinum'>
							<HashLink
								className='pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet '
								to='\#about'
							>
								About
							</HashLink>
						</li>
						<li className='px-3 text-[1.2rem] group hover:bg-jet dark:hover:bg-platinum'>
							<HashLink
								className='pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet'
								to='\#knowledge'
							>
								Skills
							</HashLink>
						</li>
						<li className='px-3 text-[1.2rem] group hover:bg-jet dark:hover:bg-platinum'>
							<HashLink
								className='pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet'
								to='\#projects'
							>
								Projects
							</HashLink>
						</li>
						<div className=' size-10 pt-1 flex items-center'>
							<Switch setTheme={setTheme} theme={theme} />
						</div>
					</ul>
				</div>
				<div className='md:hidden flex items-center gap-6'>
					<div
						className='w-8 h-[20px]'
						onClick={() => {
							openMenu();
						}}
					>
						<Menu theme={theme} />
					</div>
					<div className='size-10 flex items-center'>
						<Switch setTheme={setTheme} theme={theme} />
					</div>
				</div>
			</div>

			<div
				id='menuMobile'
				className='overflow-hidden hidden w-full absolute left-0 top-16 align-middle'
			>
				<ul className=' text-right items-center border-y-[1px] border-jet dark:hover:border-platinum'>
					<li className=' px-3 pr-20 text-[1.2rem] group  hover:bg-jet dark:hover:bg-platinum'>
						<HashLink
							className=' pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet'
							to='\#about'
						>
							About
						</HashLink>
					</li>
					<li className=' px-3 pr-20 text-[1.2rem] group  hover:bg-jet dark:hover:bg-platinum'>
						<HashLink
							className=' pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet'
							to='\#knowledge'
						>
							Skills
						</HashLink>
					</li>
					<li className=' px-3 pr-20 text-[1.2rem] group  hover:bg-jet dark:hover:bg-platinum'>
						<HashLink
							className=' pointer dark:text-platinum text-jet group-hover:text-platinum dark:group-hover:text-jet'
							to='\#projects'
						>
							Projects
						</HashLink>
					</li>
				</ul>
			</div>
		</header>
	);
}
