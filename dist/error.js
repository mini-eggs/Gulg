'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GulgError = function (_Error) {
  (0, _inherits3.default)(GulgError, _Error);

  function GulgError(props) {
    (0, _classCallCheck3.default)(this, GulgError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GulgError.__proto__ || (0, _getPrototypeOf2.default)(GulgError)).call(this, props));

    console.log();
    console.log('Oops! Something went wrong.  😞   Error below.  ⬇️ ');
    console.log(props);
    console.log();
    return _this;
  }

  return GulgError;
}(Error);

exports.default = GulgError;