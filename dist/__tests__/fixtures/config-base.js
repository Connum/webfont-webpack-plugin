"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  entry: _path.default.join(__dirname, "entry.js"),
  mode: "development",
  module: {
    rules: [{
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }, {
      loader: "url-loader",
      test: /\.(svg|eot|ttf|woff|woff2)?$/
    }, {
      loaders: "file-loader?name=[name].[ext]",
      test: /\.(svg|eot|ttf|woff|woff2)?$/
    }]
  },
  output: {
    filename: "bundle.js",
    path: _path.default.join(__dirname, "build")
  },
  plugins: []
};
exports.default = _default;