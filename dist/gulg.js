"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _tasks = require("./tasks");

var _tasks2 = _interopRequireDefault(_tasks);

var _prompt = require("./prompt");

var _prompt2 = _interopRequireDefault(_prompt);

var _error = require("./error");

var _error2 = _interopRequireDefault(_error);

var _runner = require("./runner");

var _runner2 = _interopRequireDefault(_runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gulg = function () {
  function Gulg() {
    (0, _classCallCheck3.default)(this, Gulg);

    this.state = {
      tasks: [],
      chosen: null,
      error: null
    };
    this.Tasks = new _tasks2.default({
      base: _path2.default.join(process.cwd(), "gulpfile.js")
    });
  }

  (0, _createClass3.default)(Gulg, [{
    key: "list",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var runner;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.Tasks.getAllTasks();

              case 3:
                this.state.tasks = _context.sent;
                _context.next = 6;
                return (0, _prompt2.default)(this.state.tasks);

              case 6:
                this.state.chosen = _context.sent;
                runner = new _runner2.default({
                  directory: this.getDirectory(),
                  task: this.state.chosen.name
                });

                runner.run();
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);

                new _error2.default(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function list() {
        return _ref.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "getDirectory",
    value: function getDirectory() {
      var task = this.state.chosen;
      var dir = task.file.split("/");
      dir.pop();
      return dir.join("/");
    }
  }]);
  return Gulg;
}();

exports.default = Gulg;