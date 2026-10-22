
import airbnb from "eslint-config-airbnb-base-x/flat";
import tseslint from "typescript-eslint";
import globals from "globals";

const unusedVarsOptions = {
	vars: "all",
	args: "all",
	argsIgnorePattern: "^_",
	caughtErrors: "all",
	caughtErrorsIgnorePattern: "^_",
	varsIgnorePattern: "^_",
};

const sharedRules = {
	indent: ["error", "tab"],
	"no-tabs": "off",
	"no-unused-vars": ["error", unusedVarsOptions],
};

const ignoresConfig = {
	ignores: [
		"**/node_modules/**",
		"**/dist/**",
		"**/build/**",
		"**/out/**",
		"**/coverage/**",
		"**/*.log",
		"**/.cache/**",
		"**/.eslintcache",
		"**/.next/**",
		"**/.nuxt/**",
		"**/.svelte-kit/**",
		"**/.pnp/**",
		"**/vendor/**",
		"**/public/build/**",
		"**/*.min.js",
	],
};

const esmConfig = {
	files: ["**/*.js", "**/*.mjs"],

	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: {
			...globals.browser,
			...globals.node,
		},
	},

	rules: sharedRules,
};

const commonJsConfig = {
	files: ["**/*.cjs"],

	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "commonjs",
		globals: {
			...globals.node,
		},
	},

	rules: sharedRules,
};

const typeScriptConfig = {
	files: ["**/*.ts", "**/*.mts", "**/*.cts"],

	languageOptions: {
		ecmaVersion: "latest",
		parser: tseslint.parser,

		parserOptions: {
			projectService: true,
		},

		globals: {
			...globals.browser,
			...globals.node,
		},
	},

	rules: {
		...sharedRules,

		"no-unused-vars": "off",

		"@typescript-eslint/no-unused-vars": [
			"error",
			unusedVarsOptions,
		],

		"@typescript-eslint/consistent-type-imports": "error",

		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"interface",
		],

		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-misused-promises": "error",
		"@typescript-eslint/require-await": "error",

		"@typescript-eslint/return-await": [
			"error",
			"in-try-catch",
		],

		"@typescript-eslint/prefer-nullish-coalescing": "error",
		"@typescript-eslint/prefer-optional-chain": "error",

		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-condition": "warn",
		"@typescript-eslint/no-redundant-type-constituents": "error",

		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-empty-object-type": "warn",
	},
};

const testConfig = {
	files: [
		"**/*.test.{js,mjs,cjs,ts,mts,cts}",
		"**/*.spec.{js,mjs,cjs,ts,mts,cts}",
		"test/**/*.{js,mjs,cjs,ts,mts,cts}",
		"tests/**/*.{js,mjs,cjs,ts,mts,cts}",
	],

	languageOptions: {
		globals: {
			...globals.node,
			...globals.jest,
		},
	},

	rules: {
		"no-console": "off",
		"no-empty-function": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
};

const linterOptionsConfig = {
	linterOptions: {
		reportUnusedDisableDirectives: "error",
		reportUnusedInlineConfigs: "error",
	},
};

export default [
	ignoresConfig,

	...airbnb.recommended,
	...airbnb.recommendedNode,

	// Regras TypeScript sem exigir tipos para arquivos JavaScript.
	{
		files: ["**/*.ts", "**/*.mts", "**/*.cts"],
		extends: [tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
			},
		},
	},

	// JavaScript não recebe regras que dependem de informações de tipos.
	{
		files: ["**/*.{js,mjs,cjs}"],
		extends: [tseslint.configs.disableTypeChecked],
	},

	esmConfig,
	commonJsConfig,
	typeScriptConfig,
	testConfig,
	linterOptionsConfig,
];
