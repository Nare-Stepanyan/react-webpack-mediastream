const HtmlWebpackPlugin = require("html-webpack-plugin");

const LOADERS = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "babel-loader",
  },
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
];
const PLUGINS = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./public/index.html",
  }),
];

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: LOADERS,
  },
  plugins: PLUGINS,
  devServer: {
    port: 3002,
  },
};
