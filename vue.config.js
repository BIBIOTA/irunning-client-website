// module.exports = {
//   transpileDependencies: [
//     'vuetify'
//   ],
//   rules: [
//     {
//       test: /\.s[ac]ss$/i,
//       use: [
//         'vue-style-loader',
//         // Creates `style` nodes from JS strings
//         "style-loader",
//         // Translates CSS into CommonJS
//         "css-loader",
//         // Compiles Sass to CSS
//         {
//           loader: 'sass-loader',
//           // Requires >= sass-loader@^8.0.0
//           options: {
//             implementation: require('sass'),
//             sassOptions: {
//               indentedSyntax: true // optional
//             },
//           },
//         },
//       ],
//     },
//   ],
// }

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/irunning-client-website/' : '/',
};
