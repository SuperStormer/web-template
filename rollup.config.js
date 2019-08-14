let path = require("path");
let BabelPlugin = require("rollup-plugin-babel");
let TerserPlugin = require("rollup-plugin-terser").terser;
let EslintPlugin = require("rollup-plugin-eslint").eslint;
let production = process.env.NODE_ENV === 'production';
let plugins = [
	EslintPlugin(),
	BabelPlugin(),
];
let pathName = "";
if (production) {
	plugins.push(
		TerserPlugin({
			ecma: 8,
			compress: {
				ecma: 8,
				passes: 2,
			},
			output: {
				ecma: 8
			}
		})
	);
	pathName = "build/prod/scripts";
} else {
	pathName = "build/dev/scripts";
}
module.exports = {
	input: "./src/scripts/index.js",
	output: {
		file: path.resolve(__dirname, pathName, "bundle.js"),
		format: "es",
		sourcemap: true
	},
	plugins
};