"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLinks = exports.uniqueLinks = exports.totalLinks = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateLinks = arrLinks => {
  const arrPromises = arrLinks.map(element => new Promise(resolve => {
    return (0, _nodeFetch.default)(element.href).then(res => {
      if (res.status >= 200 && res.status < 400) {
        element.status = res.status;
        element.statusText = res.statusText;
        resolve(element);
      } else {
        element.status = res.status;
        element.statusText = 'FAIL';
        resolve(element);
      }
    }).catch(() => {
      element.status = 404;
      element.statusText = 'FAIL';
      resolve(element);
    });
  }));
  return Promise.all(arrPromises).then(res => {
    return res;
  });
};

exports.validateLinks = validateLinks;

const totalLinks = arrLinks => {
  const totalLinks = arrLinks.length;
  return `TOTAL: ${totalLinks}`;
};

exports.totalLinks = totalLinks;

const uniqueLinks = arrLinks => {
  const uniqueLinks = [...new Set(arrLinks.map(elem => elem.href))].length;
  return `UNIQUE: ${uniqueLinks}`;
};

exports.uniqueLinks = uniqueLinks;