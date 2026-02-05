import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

export default function App() {
  const initialTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(initialTheme != "dark" ? "light" : "dark");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home theme={theme} setTheme={setTheme} />,
    },
    {
      path: "/blog",
      element: <Blog theme={theme} setTheme={setTheme} />,
    },
    {
      path: "*",
      element: <NotFound theme={theme} setTheme={setTheme} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
