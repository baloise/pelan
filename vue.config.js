const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {

    pwa: {
        name: 'Pelan',
        themeColor: '#ffffff',
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
