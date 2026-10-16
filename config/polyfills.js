import airbnb from "eslint-config-airbnb-base-x/flat";
import tseslint from "typescript-eslint";
import globals from "globals";

/**
 * ESLint PRO — Flat Config
 *
 * Princípios aplicados:
 * - Configuração organizada e previsível.
 * - Separação entre ESM, CommonJS e TypeScript.
 * - Ambientes específicos por tipo de arquivo.
 * - Type-aware linting.
 * - Regras compartilhadas centralizadas.
 * - Identificação de variáveis não utilizadas.
 * - Detecção de diretivas eslint-disable desnecessárias.
 * - Suporte a testes automatizados.
 * - Exclusão de arquivos e diretórios gerados.
 *
 * Divergências intencionais em relação ao Airbnb:
 * - Uso de tabs em vez de espaços.
 * - Tabs permitidas no código.
 */

// ------------------------------------------------------------
// 1. Regras compartilhadas
// ------------------------------------------------------------

const sharedRules = Object.freeze({
	indent: ["error", "tab"],
	"no-tabs": "off",

	"no-unused-vars": [
		"error",
		{
			vars: "all",
			args: "all",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			varsIgnorePattern: "^_",
		},
	],
});

// ------------------------------------------------------------
// 2. Opções de linguagem
// ------------------------------------------------------------

const commonLanguageOptions = {
	ecmaVersion: "latest",
};

// ------------------------------------------------------------
// 3. Arquivos e diretórios ignorados
// ------------------------------------------------------------

const ignoresConfig = {
	ignores: [
		// Dependências
		"node_modules/**",

		// Build
		"dist/**",
		"build/**",
		"out/**",

		// Cobertura
		"coverage/**",

		// Logs
		"*.log",

		// Cache
		".cache/**",
		".eslintcache",

		// Frameworks
		".next/**",
		".nuxt/**",
		".svelte-kit/**",

		// Yarn Plug'n'Play
		".pnp/**",

		// Artefatos gerados
		"vendor/**",
		"public/build/**",

		// Arquivos minificados
		"**/*.min.js",
	],
};

// ------------------------------------------------------------
// 4. Configuração ESM
// ------------------------------------------------------------

const esmConfig = {
	files: ["**/*.js", "**/*.mjs"],

	languageOptions: {
		...commonLanguageOptions,
		sourceType: "module",

		globals: {
			...globals.browser,
			...globals.node,
		},
	},

	rules: sharedRules,
};

// ------------------------------------------------------------
// 5. Configuração CommonJS
// ------------------------------------------------------------

const commonJsConfig = {
	files: ["**/*.cjs"],

	languageOptions: {
		...commonLanguageOptions,
		sourceType: "commonjs",

		globals: {
			...globals.node,
		},
	},

	rules: sharedRules,
};

// ------------------------------------------------------------
// 6. Configuração TypeScript
// ------------------------------------------------------------

const typeScriptConfig = {
	files: ["**/*.ts", "**/*.mts", "**/*.cts"],

	languageOptions: {
		...commonLanguageOptions,

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

		// Desativa a regra JS em favor da versão TS
		"no-unused-vars": "off",

		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				vars: "all",
				args: "all",
				argsIgnorePattern: "^_",
				caughtErrors: "all",
				caughtErrorsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],

		// Organização de tipos
		"@typescript-eslint/consistent-type-imports": "error",

		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"interface",
		],

		// Segurança e qualidade
		"@typescript-eslint/await-thenable": "error",

		"@typescript-eslint/no-floating-promises": "error",

		"@typescript-eslint/no-misused-promises": "error",

		"@typescript-eslint/require-await": "error",

		"@typescript-eslint/return-await": [
			"error",
			"in-try-catch",
		],

		// Modernização
		"@typescript-eslint/prefer-nullish-coalescing": "error",

		"@typescript-eslint/prefer-optional-chain": "error",

		// Análises baseadas em tipos
		"@typescript-eslint/no-unnecessary-type-assertion":
			"error",

		"@typescript-eslint/no-unnecessary-condition":
			"warn",

		"@typescript-eslint/no-redundant-type-constituents":
			"error",

		// Flexibilidade controlada
		"@typescript-eslint/no-explicit-any": "warn",

		"@typescript-eslint/no-empty-object-type": "warn",
	},
};

// ------------------------------------------------------------
// 7. Configuração de testes
// ------------------------------------------------------------

const testConfig = {
	files: [
		"**/*.test.js",
		"**/*.test.mjs",
		"**/*.test.ts",

		"**/*.spec.js",
		"**/*.spec.mjs",
		"**/*.spec.ts",

		"test/**/*.js",
		"test/**/*.ts",

		"tests/**/*.js",
		"tests/**/*.ts",
	],

	languageOptions: {
		...commonLanguageOptions,

		globals: {
			...globals.node,
			...globals.jest,
		},
	},

	rules: {
		...sharedRules,

		"no-console": "off",
		"no-empty-function": "off",

		// Mais flexível para mocks e stubs
		"@typescript-eslint/no-explicit-any": "off",
	},
};

// ------------------------------------------------------------
// 8. Opções do ESLint
// ------------------------------------------------------------

const linterOptionsConfig = {
	linterOptions: {
		reportUnusedDisableDirectives: "error",
	},
};

// ------------------------------------------------------------
// 9. Exportação
// ------------------------------------------------------------

export default [
	ignoresConfig,

	...airbnb.recommended,
	...airbnb.recommendedNode,

	// Type-aware linting
	...tseslint.configs.recommendedTypeChecked,

	esmConfig,
	commonJsConfig,
	typeScriptConfig,
	testConfig,
	linterOptionsConfig,
];
