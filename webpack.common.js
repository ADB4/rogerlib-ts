// Webpack configuration shared by development and production builds
//
// Webpack Docs:
// https://webpack.js.org/guides/production/

const path = require("path");
const { existsSync } = require("fs");

// Set the entrypoint to main.jsx by default, but main.tsx if using TypeScript.
let entry = "./rogerlib/js/main.jsx";
if (existsSync("./rogerlib/js/main.tsx")) {
  entry = "./rogerlib/js/main.tsx";
}

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.join(__dirname, "/rogerlib/static/js/"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/transform-runtime"],
        },
      },
      {
        // Support for TypeScript in optional .ts or .tsx files
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
    descriptionFiles: ['package.json'],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      "child_process": false,
      "worker_threads": false,
      "uglify-js": false,
      "@swc/core": false,
      util: false,
      vm: false,
      path: false,
      crypto: false,
      zlib: false,
      stream: false,
      https: false,
      http: false,
      url: false,
      querystring: false,
      os: false,
      constants: false,
      assert: false,
      fs: false,
      esbuild: false,
      inspector: false
    }
  },
};
