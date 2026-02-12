import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
	const [theme, setTheme] = useState(() =>
		localStorage.getItem("theme") !== "dark" ? "light" : "dark",
	);

	return (
		<BrowserRouter>
			<Suspense fallback={<div className='min-h-screen' />}>
				<Routes>
					<Route
						path='/'
						element={<Home theme={theme} setTheme={setTheme} />}
					/>
					<Route
						path='/blog'
						element={<Blog theme={theme} setTheme={setTheme} />}
					/>
					<Route
						path='*'
						element={<NotFound theme={theme} setTheme={setTheme} />}
					/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
