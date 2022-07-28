"use strict";

var _path = _interopRequireDefault(require("path"));

var _del = _interopRequireDefault(require("del"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _webpack = _interopRequireDefault(require("webpack"));

var _WebfontPlugin = _interopRequireDefault(require("../WebfontPlugin"));

var _configBase = _interopRequireDefault(require("./fixtures/config-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fixtures = _path.default.resolve(__dirname, "fixtures");

const cssDir = _path.default.join(fixtures, "css");

const pluginBaseConfig = {
  dest: _path.default.resolve(cssDir, "../css"),
  destTemplate: _path.default.resolve(cssDir, "../css"),
  files: _path.default.join(fixtures, "svg-icons/**/*.svg"),
  template: "css",
  templateFontPath: "./"
};
/* eslint-disable no-sync */

describe("webfontPlugin", () => {
  beforeAll(() => (0, _del.default)([_path.default.resolve(fixtures, "build"), _path.default.resolve(fixtures, "css/*.{svg,ttf,eot,woff,woff2,css}")]));
  afterEach(() => (0, _del.default)([_path.default.resolve(fixtures, "build"), _path.default.resolve(fixtures, "css/*.{svg,ttf,eot,woff,woff2,css}")]));
  it("should export `WebfontPlugin` as a class", () => {
    expect(typeof _WebfontPlugin.default === "function").toBe(true);
  });
  it("should throw error if not passed `files`", () => {
    expect(() => new _WebfontPlugin.default()).toThrow("Require `files` options");
  });
  it("should throw error if not passed `dest`", () => {
    expect(() => new _WebfontPlugin.default({
      files: "**!/!*.svg"
    })).toThrow("Require `dest` options");
  });
  it("should generate fonts and build-in template", done => {
    const options = Object.assign({}, pluginBaseConfig);
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    (0, _webpack.default)(_configBase.default, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot("warnings");
      expect(stats.compilation.errors).toMatchSnapshot("errors");
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      return done();
    });
  });
  it("should generate fonts and external template", done => {
    const options = Object.assign({}, pluginBaseConfig, {
      template: _path.default.resolve(fixtures, "templates/webfont.css.njk")
    });
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    (0, _webpack.default)(_configBase.default, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot();
      expect(stats.compilation.errors).toMatchSnapshot();
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      expect(Object.keys(stats.compilation.assets)).toMatchSnapshot();
      return done();
    });
  });
  it("should generate fonts and external config", done => {
    const options = Object.assign({}, pluginBaseConfig, {
      config: _path.default.resolve(fixtures, "config/.webfontrc")
    });
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    (0, _webpack.default)(_configBase.default, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot();
      expect(stats.compilation.errors).toMatchSnapshot();
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      return done();
    });
  });
  it("should regenerate fonts and build-in template in watch mode", done => {
    const options = Object.assign({}, pluginBaseConfig);
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    const compiler = (0, _webpack.default)(_configBase.default);
    let countCompilation = 0;
    const watching = compiler.watch({}, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot(`warning in compilation ${countCompilation}`);
      expect(stats.compilation.errors).toMatchSnapshot(`errors in compilation ${countCompilation}`);

      if (countCompilation === 0) {
        watching.close();
      }

      countCompilation++;
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      return done();
    });
    Promise.resolve().then(() => _fsExtra.default.readFile(_path.default.join(fixtures, "svg-icons/avatar.svg"))).then(content => _fsExtra.default.writeFile(_path.default.join(fixtures, "svg-icons/avatar.svg"), content)).catch(error => {
      throw error;
    });
  });
  it("should regenerate fonts and external template in watch mode", done => {
    const options = Object.assign({}, pluginBaseConfig, {
      template: _path.default.resolve(fixtures, "templates/webfont.css.njk")
    });
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    const compiler = (0, _webpack.default)(_configBase.default);
    let countCompilation = 0;
    const watching = compiler.watch({}, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot(`warning in compilation ${countCompilation}`);
      expect(stats.compilation.errors).toMatchSnapshot(`errors in compilation ${countCompilation}`);

      if (countCompilation === 0) {
        watching.close();
      }

      countCompilation++;
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      return done();
    });
    Promise.resolve().then(() => _fsExtra.default.readFile(_path.default.resolve(fixtures, "templates/webfont.css.njk"))).then(content => _fsExtra.default.writeFile(_path.default.resolve(fixtures, "templates/webfont.css.njk"), content)).catch(error => {
      throw error;
    });
  });
  it("should generate and regenerate fonts and external config in watch mode", done => {
    const options = Object.assign({}, pluginBaseConfig, {
      config: _path.default.resolve(fixtures, ".webfontrc")
    });
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    const compiler = (0, _webpack.default)(_configBase.default);
    let countCompilation = 0;
    const watching = compiler.watch({}, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot(`warning in compilation ${countCompilation}`);
      expect(stats.compilation.errors).toMatchSnapshot(`errors in compilation ${countCompilation}`);

      if (countCompilation === 0) {
        watching.close();
      }

      countCompilation++;
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.css"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.eot"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.svg"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.ttf"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff"))).toBe(true);
      expect(_fsExtra.default.existsSync(_path.default.join(cssDir, "webfont.woff2"))).toBe(true);
      return done();
    });
    Promise.resolve().then(() => _fsExtra.default.readFile(_path.default.resolve(fixtures, ".webfontrc"))).then(content => _fsExtra.default.writeFile(_path.default.resolve(fixtures, ".webfontrc"), content)).catch(error => {
      throw error;
    });
  });
  it("should has errors with default `bail` value", done => {
    const options = Object.assign({}, pluginBaseConfig, {
      files: [_path.default.resolve(__dirname, "fixtures/svg-icons/**/*.svg"), _path.default.resolve(__dirname, "fixtures/broken-svg-icons/**/*.svg")]
    });
    _configBase.default.plugins = [new _WebfontPlugin.default(options)];
    (0, _webpack.default)(_configBase.default, (error, stats) => {
      if (error) {
        throw error;
      }

      expect(stats.compilation.warnings).toMatchSnapshot();
      expect(stats.compilation.errors).toHaveLength(1);
      expect(Object.keys(stats.compilation.assets)).toMatchSnapshot();
      done();
    });
  });
});