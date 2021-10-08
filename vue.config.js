module.exports = {
  outputDir: './dist',
  css: {
      extract: true, // 是否要抽離 css，若為否，所有 css 都會內聯在 js 中。預設為 true
      sourceMap: process.env.VUE_APP_ENV === 'production' ? false : true, // 是否要生成 sourceMap，預設為 false。建議在開發情況下打開
  },
  configureWebpack: {
      optimization: {
          splitChunks: { // chunk 的檔案大小，最大不超過 250kb
              minSize: 10000,
              maxSize: 250000, 
          },
      },
      performance: {
          hints: false, // 決定是否開啟效能警告
          maxEntrypointSize: 512000, // 預設值為 244Kib，若超過會跳警告
          maxAssetSize: 512000,
      },
  },
  productionSourceMap: false, // production 環境下，是否生成 sourceMap。對 js 而言，預設為 true，建議可關閉
  publicPath: './',
  transpileDependencies: ['vuetify'], // babel 預設不會讀取 node_modules，若你有套件需要編譯的，可在這邊設定
};