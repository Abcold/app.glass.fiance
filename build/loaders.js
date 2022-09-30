const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoaders = function (options) {
  options = options || {}

  const miniCssExtractLoader = {
    loader: MiniCssExtractPlugin.loader
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const resolveUrlLoader = {
    loader: 'resolve-url-loader'
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = ((options.usePostCSS && loader) || options.enableCssSourceMap) ? [cssLoader, resolveUrlLoader] : [cssLoader]

    if (loader) {
      let CSSLoaderOptions = Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      });
      // if (/s[ca]ss/.test(loader)) {
      //   CSSLoaderOptions.additionalData = `
      //       @import "@views/theme/src/common/_variable.scss";
      //     `
      //   //this file will be injected every SCSS file or fragment but it will not be output to CSS as it contains only variable declaration
      // }
      loaders.push({
        loader: loader + '-loader',
        options: CSSLoaderOptions
      })
    }

    return [miniCssExtractLoader].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
exports.styleLoaders = function (options) {
  const output = []
  const loaders = cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

module.exports = {
  loaders: exports.styleLoaders({
    sourceMap: true,
    extract: false
  }),
  cssSourceMap: true,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
