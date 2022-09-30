const {defineConfig} = require('@vue/cli-service')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const vueLoaderConfig = require('./build/loaders')
// import ElementPlus from 'unplugin-element-plus/webpack'
// import IconsResolver from 'unplugin-icons/resolver'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = defineConfig({
  outputDir: 'dist',
  publicPath: '',
  transpileDependencies: true,
  pluginOptions: {
    mock: { entry: 'mock/index.js', debug: true },
  },
  configureWebpack: {
    // devServer: {
    //   https: true
    // },
    // css: {
    //   loaderOptions: {
    //     scss: {
    //       additionalData: `@use "~/src/plugins/theme.scss" as *;`,
    //     },
    //   },
    // },
    plugins: [
      // ElementPlus({
      //   useSource: true,
      // }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()
          // IconsResolver({
          //   prefix: 'Icon',
          // })
        ],
      }),
      Components({
        resolvers: [ElementPlusResolver()
          // IconsResolver({
          //   enabledCollections: ['ep'],
          // })
        ],
      }),
      require('unplugin-icons/webpack')({autoInstall: true,}),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
        ignoreOrder: true
      }),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: [resolve('src')],
          exclude: [resolve('node_modules')],
          use: [
            {
              loader: 'vue-loader',
              options: vueLoaderConfig
            }
          ]
        },
        // ...vueLoaderConfig.loaders
      ],
    },
    resolve: {
      fallback: {
        os: require.resolve("os-browserify/browser"),
        https: require.resolve("https-browserify"),
        http: require.resolve("stream-http"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        /* fs: require.resolve("browserify-fs"),*/
        path: require.resolve("path-browserify"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer")
      },
    }
  }
})

