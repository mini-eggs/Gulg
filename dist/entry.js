"use strict";

var _caporal = require("caporal");

var _caporal2 = _interopRequireDefault(_caporal);

var _gulg = require("./gulg");

var _gulg2 = _interopRequireDefault(_gulg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulg = new _gulg2.default();

var _require = require('../package.json'),
    version = _require.version;

_caporal2.default.version(version).action(function () {
  gulg.list();
}).parse(process.argv);