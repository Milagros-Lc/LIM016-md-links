"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFilesMd = exports.pathAbsoluta = exports.isValidPath = exports.isFilePath = exports.getPathsFromDirectory = exports.getLinks = exports.getContent = exports.convertPathToAbsolute = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _jsdom = _interopRequireDefault(require("jsdom"));

var _showdown = _interopRequireDefault(require("showdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  JSDOM
} = _jsdom.default;

const isFilePath = route => {
  const stats = _fs.default.lstatSync(route);

  const answerStat = stats.isFile();
  return answerStat;
};

exports.isFilePath = isFilePath;

const getPathsFromDirectory = route => {
  let arrPathFiles = [];

  if (isFilePath(route)) {
    arrPathFiles.push(route);
  } else {
    const readDirectory = _fs.default.readdirSync(route);

    readDirectory.forEach(file => {
      const pathFile = _path.default.join(route, file);

      arrPathFiles = arrPathFiles.concat(getPathsFromDirectory(pathFile));
    });
  }

  return arrPathFiles;
};

exports.getPathsFromDirectory = getPathsFromDirectory;

const searchFilesMd = arrPaths => arrPaths.filter(file => {
  return _path.default.extname(file) === ".md";
}); //..............................................


exports.searchFilesMd = searchFilesMd;
const converter = new _showdown.default.Converter();

const getContent = routeFile => _fs.default.readFileSync(routeFile).toString();

exports.getContent = getContent;

const getLinks = (contentFile, routeFile) => {
  const contentHTML = converter.makeHtml(contentFile);
  const dom = new JSDOM(contentHTML);
  const arrayOfTagsA = dom.window.document.querySelectorAll('a');
  let arrNew = [];
  arrayOfTagsA.forEach(elem => {
    arrNew.push({
      href: elem.href,
      text: elem.textContent.slice(0, 50),
      file: routeFile
    });
  });
  return arrNew;
}; //-----------------------------------------------------


exports.getLinks = getLinks;
const cwd = process.cwd();

const isValidPath = route => _fs.default.existsSync(route);

exports.isValidPath = isValidPath;

const pathAbsoluta = route => _path.default.isAbsolute(route);

exports.pathAbsoluta = pathAbsoluta;

const convertPathToAbsolute = route => _path.default.join(cwd, route);

exports.convertPathToAbsolute = convertPathToAbsolute;