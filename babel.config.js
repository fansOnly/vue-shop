module.exports = {
	presets: [
		['@vue/app', {
			polyfills: [
				'es6.promise',
				'es6.symbol'
			]
		}]
	],
	plugins: [
		"transform-vue-jsx",
		"transform-runtime",
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