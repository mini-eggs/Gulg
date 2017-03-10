"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _htmlMinifier = require("html-minifier");

var _htmlMinifier2 = _interopRequireDefault(_htmlMinifier);

var _replaceall = require("replaceall");

var _replaceall2 = _interopRequireDefault(_replaceall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlMinifierOptions = { minifyJS: true, collapseWhitespace: true };

var Tasks = function () {
  function Tasks(props) {
    (0, _classCallCheck3.default)(this, Tasks);

    this.state = {
      base: props.base
    };
  }

  (0, _createClass3.default)(Tasks, [{
    key: "getDataFromFile",
    value: function getDataFromFile(file) {
      var gulpfile = _fs2.default.readFileSync(_path2.default.join(file));
      gulpfile = gulpfile.toString("utf8");
      gulpfile = "<script>" + gulpfile + "</script>";
      gulpfile = _htmlMinifier2.default.minify(gulpfile, HtmlMinifierOptions);
      gulpfile = (0, _replaceall2.default)('"', "'", gulpfile);
      gulpfile = (0, _replaceall2.default)(" ", "", gulpfile);
      var gulpdata = gulpfile.split("require('");
      var gulprequires = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(gulpdata), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var single = _step.value;

          if (single.includes("')")) {
            var anotherFile = single.split("')")[0];
            if (anotherFile.includes("./")) {
              // local file, lets read it
              gulprequires.push(anotherFile);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        file: gulpfile,
        requires: gulprequires
      };
    }
  }, {
    key: "getTasks",
    value: function getTasks(string) {
      var stringdata = string.split(".task(");
      // first one is no good
      // throw it out with filter
      return stringdata.map(function (single, index) {
        if (index === 0) return null;
        return single.split("'")[1];
      }).filter(function (n) {
        return n;
      });
    }
  }, {
    key: "getTasksRecursive",
    value: function getTasksRecursive() {
      var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.base;
      var tasks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var data = this.getDataFromFile(file);
      var aTasks = this.getTasks(data.file);

      tasks = tasks.concat(aTasks.map(function (single) {
        return {
          name: single,
          file: file
        };
      }));

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(data.requires), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var single = _step2.value;

          tasks = tasks.concat(this.getTasksRecursive(single, tasks));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return [].concat((0, _toConsumableArray3.default)(new _set2.default(tasks)));
    }
  }]);
  return Tasks;
}();

exports.default = function () {
  var base = _path2.default.join(process.cwd(), "gulpfile.js");
  var tasks = new Tasks({ base: base });
  return tasks.getTasksRecursive();
};