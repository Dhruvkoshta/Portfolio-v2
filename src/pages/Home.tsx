import Navbar from "../components/Navbar";
import About from "..//components/Home/About";
import Skills from "../components/Home/Skills";
import Projects from "../components/Home/Projects";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Introduction from "../components/Home/Introduction";

export default function Home({
	theme,
	setTheme,
}: {
	theme: string;
	setTheme: (theme: string) => void;
}) {
	useEffect(() => {
		console.log(
			`
                   _..
  /}_{\\           /.-'
 ( a a )-.___...-'/
 ==._.==         ;
      \\ i _..._ /,
      {_;/   {_//  dkk
`
		);
		console.log(
			"%cwhat are u doing here? ( ͠° ͟ʖ ͡°) ",
			"background: #722F37; font-size: 1.5rem"
		);
	}, []);

	return (
		<div id='at' className={`${theme ?? "dark"}`}>
			<div className='max-sm:w-screen flex justify-center bg-platinum dark:bg-jet'>
				<div className=' dark:text-platinum max-w-[1240px] max-sm:w-[100%] space-y-8 text-jet'>
					<Navbar setTheme={setTheme} theme={theme} />
					<Introduction theme={theme} />
					<About />
					<Skills />
					<Projects />
					<Footer />
				</div>
			</div>
		</div>
	);
}
