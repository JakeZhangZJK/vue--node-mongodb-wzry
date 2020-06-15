module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wzry' : '/',
  outputDir: __dirname + '/../server/web',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@store'
      }
    }
  }
}