'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var aTasks, task;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aTasks = void 0;
            _context.prev = 1;

            aTasks = (0, _tasks2.default)();
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](1);

            errorHandler('No gulpfile.js was found. If there is a gulpfile.js in the current directory feel free to open an issue in our repo.');
            return _context.abrupt('return');

          case 9:
            task = (0, _prompt2.default)(aTasks);
            _context.prev = 10;
            _context.t1 = runTask;
            _context.next = 14;
            return task;

          case 14:
            _context.t2 = _context.sent;
            (0, _context.t1)(_context.t2);
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t3 = _context['catch'](10);

            errorHandler('There was an issue running the Gulp task. Ensure Gulp is installed globally. Feel free to open an issue in our repo.');
            return _context.abrupt('return');

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 5], [10, 18]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _prompt = require('./prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _nodeCmd = require('node-cmd');

var _nodeCmd2 = _interopRequireDefault(_nodeCmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runTask(task) {
  var dir = task.file.split('/');
  dir.pop();
  dir = dir.join('/');
  console.log();
  console.log('Firing task ' + task.name + '  \uD83D\uDE43');
  console.log();
  _nodeCmd2.default.get('cd ' + dir + ' && gulp ' + task.name, function (consoleOutput) {
    console.log('Gulp output below: ');
    console.log();
    console.log(consoleOutput);
    console.log();
  });
}

function errorHandler(err) {
  console.log();
  console.log('Something went wrong. Error below:');
  console.log(err);
  console.log();
}

exports.default = main();