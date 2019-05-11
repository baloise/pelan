const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {

    pwa: {
        name: 'Pelan',
        themeColor: '#008AC9',
        msTileColor: '#2b5797',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: { skipWaiting: true }
    },

    configureWebpack: () => {
        return {
            plugins: [
                // new BundleAnalyzerPlugin(),
                new VuetifyLoaderPlugin(),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ]
        }
    },

    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    }

}
