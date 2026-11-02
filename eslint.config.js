import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: [
			"dist",
			"node_modules",
			".vite",
			".wrangler",
			".output",
			"legacy",
			"src/routeTree.gen.ts",
			"worker-configuration.d.ts",
			"playwright-report",
			"test-results",
		],
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		extends: [js.configs.recommended],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.node,
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		languageOptions: {
			ecmaVersion: 2022,
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	{
		files: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
		rules: {
			"react-refresh/only-export-components": "off",
		},
	},
);
