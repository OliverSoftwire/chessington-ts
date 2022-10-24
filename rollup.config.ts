import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

const config: RollupOptions = {
	input: "src/frontend/chessington.ts",
	plugins: [
		typescript({
			tsconfig: "tsconfig.build.json",
		}),
		nodeResolve({
			browser: true,
		}),
	],
	output: {
		file: "public/js/chessington.js",
	},
};

export default config;
