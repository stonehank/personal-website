const webpack = require('webpack')
const path = require('path')

const glob = require('glob-all')
const dirVars = require('./base/dir-vars.config.js')
const { transFlat, notTransFolder, notTransFlat, transFolder } = require('./base/page-entries.config.js')
const { publicPath, notTransPrefix, author, authorDescription} = require('./config')
const customPageConfig = require('./pageConfig')
const {primaryLang,otherLangList,languageUrlStr} = require('../locales/config')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageCompressPlugin=require('image-compress-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const { VuetifyLoaderPlugin } = require('vuetify-loader')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer


otherLangList.unshift(primaryLang)
const allLangList=otherLangList
const fullAuthor=author+'-'+authorDescription
const isDev = process.env.NODE_ENV === 'development'

const configPlugins = [
  new WebpackBar(),
  !isDev && new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin({analyzerMode: isDev ? 'disabled' : 'static', analyzerPort: 8888,}),
  new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
  !isDev && false && new PurgecssPlugin({
    paths: glob.sync([
    `${dirVars.srcRootDir}/**/*.?(ejs|js|vue|jsx)`,
    `${dirVars.staticRootDir}/copy-file/assets/**/*.?(ejs|js|vue|jsx)`,
    ], { nodir: true }),
    whitelist:['theme-dark','theme-light']
  }),
  new DuplicatePackageCheckerPlugin(),
  new webpack.ProvidePlugin({
    $:'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
   _: 'lodash',
   anime: ['animejs', 'default'],

  }),
  !isDev && new ImageCompressPlugin(),
  new VueLoaderPlugin(),
  // new FriendlyErrorsWebpackPlugin(),
  // new ErrorOverlayPlugin(),
  new VuetifyLoaderPlugin(),
  new CopyPlugin(
    isDev
      ? [

        { from: 'copy-file', to: '' },
      ]
      : [

        { from: 'public', to: 'static' },
        { from: 'copy-file', to: '' },
      ]
  ),
  isDev && new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: isDev ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash:8].css',
    chunkFilename: isDev ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash:8].css',
  }),
  !isDev && new PrerenderSPAPlugin({
    staticDir: path.join(dirVars.staticRootDir, 'dist'),
    routes: require('./getRouteInSpa'),
    renderer: new Renderer({
      maxConcurrentRoutes: 12,
    })
  })
]

function resolveFlat(page,langList,fullPagePath){
  let filename = ''
  // ??????filename??????
  langList.forEach(lang => {
    if (lang === primaryLang) {
      filename = `./${page}.html`
    } else {
      filename = `./${languageUrlStr[lang]}/${page}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.staticRootDir,'./webpack-config/common-html-js/pageHtml.js'),
      inject: true,
      cache: true,
      templateParameters: {
        fullPagePath,
        author:fullAuthor,
        language: lang,
        publicPath: isDev ? '/' : publicPath,
        folderLocalesName1:null,
        folderLocalesName2:null,
        pageLocalesName:page,
        customPageConfig,
        isDev
      },
      chunks: [page, 'vendor','commons', 'libs', 'manifest']
    })
    configPlugins.unshift(htmlPlugin)
  })
}
function resolveDeep(pathArr,langList){
  let folderName1=''
  let folderName2=''
  let pageName=''
  let fullPagePath=''
  // ???????????????????????????
  if(pathArr.length===3){
    [folderName1,pageName,fullPagePath]=pathArr
  }else{
    [folderName1,folderName2,pageName,fullPagePath]=pathArr
  }
  let filename=''
  const chunks = [folderName1 + '_' + (folderName2 ? (folderName2 + '_') : '') + pageName, 'vendor', 'commons', 'libs', 'manifest']
  let outputPath='./'+folderName1 + '/' + (folderName2 ? folderName2 + '/' : '') + pageName
  langList.forEach(lang => {
    if (lang === primaryLang) {
      filename = `${outputPath}.html`
    } else {
      filename = `./${languageUrlStr[lang]}/${outputPath}.html`
    }
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: filename,
      template: path.resolve(dirVars.staticRootDir,'./webpack-config/common-html-js/pageHtml.js'),
      inject: true,
      cache: true,
      templateParameters: {
        fullPagePath,
        author:fullAuthor,
        language: lang,
        publicPath: isDev ? '/' : publicPath,
        folderLocalesName1:folderName1,
        folderLocalesName2:folderName2,
        pageLocalesName:pageName,
        customPageConfig,
        isDev
      },
      chunks: chunks
    })
    configPlugins.unshift(htmlPlugin)
  })
}

notTransFlat.forEach((page) => {
  const pageName = page.substring(notTransPrefix.length)
  resolveFlat(pageName,[primaryLang],page)
})
// ??????folder
transFlat.forEach((page) => {
  resolveFlat(page,allLangList,page)
})

notTransFolder.forEach((pathArr) => {
  resolveDeep(pathArr,[primaryLang])
})
transFolder.forEach((pathArr) => {
  resolveDeep(pathArr,allLangList)
})

module.exports = configPlugins.filter(Boolean)
