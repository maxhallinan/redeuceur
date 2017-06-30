const assert = require('chai').assert;
const redeucer = require('../dist');

describe('unit > createReducer', function () {
  describe('type signature', function () {
    it('Throws an Error if called without two arguments.', function () {
    });
    it('Throws a TypeError if cases is not an array.', function () {});
    it('Throws a TypeError if a case is not an array.', function () {});
    it('Throws an Error if a case does not have a test and a handler.', function () {});
    it('Throws a TypeError if a test is not a string, an array of strings, or a function.', function () {});
    it('Returns a function.', function () {});
  });

  describe('reducer function', function () {
    it('Takes two arguments.', function () {});
    it('Returns the initial state if called without an action argument.', function () {});
    it('Matches a string case against the action type.', function () {});
    it('Matches an array of string cases against the action type.', function () {});
    it('Calls a case function with the state and action.', function () {});
    it('Calls the handler if the case function returns a truthy value.', function () {});
    it('Does not call the handler if the case function returns a falsey value.', function () {});
    it('Returns the result of the called case handler.', function () {});
    it('Returns the handler value if the handler is not a function.', function () {});
    it('Returns state if there\'s no case match.', function () {});
    it('Memoizes the case handler.', function () {});
    it('Memoizes the reducer call.', function () {});
  });
});
