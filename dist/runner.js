"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeCmd = require("node-cmd");

var _nodeCmd2 = _interopRequireDefault(_nodeCmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runner = function () {
  function Runner(props) {
    (0, _classCallCheck3.default)(this, Runner);

    this.state = {
      directory: props.directory,
      task: props.task
    };
  }

  (0, _createClass3.default)(Runner, [{
    key: "run",
    value: function run() {
      var _this = this;

      var _state = this.state,
          directory = _state.directory,
          task = _state.task;

      _nodeCmd2.default.get("cd " + directory + " && gulp " + task, function (o) {
        _this.output(o);
      });
    }
  }, {
    key: "output",
    value: function output(gulpOutput) {
      console.log();
      console.log("Running Gulp task '" + this.state.task + "'. \uD83D\uDE43");
      console.log("Gulp output below.  ⬇️ ");
      console.log();
      console.log(gulpOutput);
      console.log();
    }
  }]);
  return Runner;
}();

exports.default = Runner;