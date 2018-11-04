module.exports = {
    // 部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 baseUrl 而不要直接修改 webpack 的 output.publicPath
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
    outputDir: 'dist',
    // 放置生成的静态资源(js、css、img、fonts) 的(相对于 outputDir 的) 目录
    assetsDir: './',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    indexPath: 'index.html',
    // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    filenameHashing: true,
    // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
    // a.一个指定了 entry, template, filename, title 和 chunks 的对象(除了 entry 之外都是可选的) 
    // b.或一个指定其 entry 的字符串
    pages: {
        index: {
            // page 的入口
            entry: 'src/index.js',
            // 模板来源
            templete: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'vue shop mall',
            // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/index.js'
    },
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    transpileDependencies: [],
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    // map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    productionSourceMap: false,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    // 需要注意的是该选项仅影响由 html - webpack - plugin 在构建时注入的标签 - 直接写在模版(public / index.html) 中的标签不受影响。
    // crossorigin: '',
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    // 需要注意的是该选项仅影响由 html - webpack - plugin 在构建时注入的标签 - 直接写在模版(public / index.html) 中的标签不受影响。
    // 另外，当启用 SRI 时，preload resource hints 会被禁用，因为 Chrome 的一个 bug 会导致文件被下载两次
    integrity: false,
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // configureWebpack: {
    //     plugins: [
    //         new MyAwesomeWebpackPlugin()
    //     ]
    // },
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    // chainWebpack: config => {},
    css: {
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        modules: false,
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        // 同样当构建 Web Components 组件时它总是会被禁用(样式是 inline 的并注入到了 shadowRoot 中) 。
        // 当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取
        // 生产环境下是 true，开发环境下是 false
        // extract: false
        sourceMap: false,
        // 向 CSS 相关的 loader 传递选项  css-loader/postcss-loader/sass-loader/less-loader/stylus-loader
        loaderOptions: {
            // 你可以这样向所有 Sass 样式传入共享的全局变量：
            // sass: {
            // @/ 是 src/ 的别名
            // 所以这里假设你有 `src/variables.scss` 这个文件
            // data: `@import "@/variables.scss";`
            // }
        }
    },
    // 有些值像 host、port 和 https 可能会被命令行参数覆写。
    // 有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 baseUrl 同步以保障正常的工作
    devServer: {
        // 配置跨域处理,只有一个代理
        proxy: 'https://wx.qiushengyl.com/api',
        // proxy: 'http://localhost:1004/api',
        // 配置跨域处理,配置多个代理
        // proxy: {
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //         target: '<other_url>'
        //     }
        // }
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
    // 向 PWA 插件传递选项
    pwa: {},
    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
    pluginOptions: {
        // foo: {
        // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
        // }
    }
}