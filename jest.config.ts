import { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	transformIgnorePatterns: ["<rootDir>/node_modules"],
	roots: ["<rootDir>/src"],
	moduleDirectories: ["node_modules", "src"],
	setupFilesAfterEnv: ["jest-extended/all"],
};

export default config;
