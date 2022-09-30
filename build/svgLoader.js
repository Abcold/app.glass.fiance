const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')
const { getOptions } = require('loader-utils');


module.exports = function vueSvgLoader(svg) {
  const { svgo: svgoConfig } = getOptions(this) || {};
  const path = this.resourcePath
  if(path.includes('src/common/Web3Modal') || path.includes('node_modules')){
    return svg
  }
  svg = optimizeSvg(svg, svgoConfig).data

  const filename = path.split('/').pop()
  const { code } = compileTemplate({
    id: filename.replace('.', '_'),
    source: svg,
    filename,
    transformAssetUrls: false
  })
  return `${code}\nexport default { render: render }`
};
