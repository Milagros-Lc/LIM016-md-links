"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFilesMd = exports.pathValidate = exports.pathFile = exports.pathAbsoluta = exports.obtenerLinks = exports.obtenerContenido = exports.lisDirectorio = exports.convertPathToAbsolute = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _jsdom = _interopRequireDefault(require("jsdom"));

var _showdown = _interopRequireDefault(require("showdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  JSDOM
} = _jsdom.default;

const pathFile = route => {
  const stats = _fs.default.lstatSync(route);

  const answerStat = stats.isFile();
  return answerStat;
};

exports.pathFile = pathFile;

const lisDirectorio = route => {
  let arrPathFiles = [];

  if (pathFile(route)) {
    arrPathFiles.push(route);
  } else {
    const readDirectory = _fs.default.readdirSync(route);

    readDirectory.forEach(file => {
      const pathFile = _path.default.join(route, file);

      arrPathFiles = arrPathFiles.concat(lisDirectorio(pathFile));
    });
  }

  return arrPathFiles;
};

exports.lisDirectorio = lisDirectorio;

const searchFilesMd = arrPaths => arrPaths.filter(file => {
  return _path.default.extname(file) === '.md';
}); //..............................................


exports.searchFilesMd = searchFilesMd;
const converter = new _showdown.default.Converter();

const obtenerContenido = rutaFile => _fs.default.readFileSync(rutaFile).toString();

exports.obtenerContenido = obtenerContenido;

const obtenerLinks = (contentFile, rutaFile) => {
  const contentHTML = converter.makeHtml(contentFile);
  const dom = new JSDOM(contentHTML);
  const arrayOfTagsA = dom.window.document.querySelectorAll('a');
  let arrNew = [];
  arrayOfTagsA.forEach(elem => {
    arrNew.push({
      href: elem.href,
      text: elem.textContent.slice(0, 50),
      file: rutaFile
    });
  });
  return arrNew;
}; //-----------------------------------------------------


exports.obtenerLinks = obtenerLinks;
const cwd = process.cwd();

const pathValidate = route => _fs.default.existsSync(route);

exports.pathValidate = pathValidate;

const pathAbsoluta = route => _path.default.isAbsolute(route);

exports.pathAbsoluta = pathAbsoluta;

const convertPathToAbsolute = route => _path.default.join(cwd, route);

exports.convertPathToAbsolute = convertPathToAbsolute;