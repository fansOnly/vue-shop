module.exports = {
	presets: [
		// ["@babel/preset-env", {
		// 	"modules": false,
		// 	"useBuiltIns": "usage"
		// }],
		['@vue/app', {
			polyfills: [
				'es6.promise',
				'es6.symbol'
			]
		}]
	],
	plugins: [
		// "transform-vue-jsx",
		// ["@babel/plugin-transform-runtime", {
		// 	// "useBuiltIns": true
		// 	// "polyfill": false
		// }],
		[
			"import",
			{
				"libraryName": "ant-design-vue",
				"libraryDirectory": "es",
				"style": "css"
			}
		],
		// ["component", {
		// 	"libraryName": "element-ui",
		// 	"styleLibraryName": "theme-chalk"
		// }]
	]
}