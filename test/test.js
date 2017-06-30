const assert = require('chai').assert;
const redeuceur = require('../dist');

describe('unit > createReducer', function () {
  describe('type signature', function () {
    it('Throws an Error if called without two arguments.', function () {
      const errMsg = 
        'Must be called with two arguments: ' +
        'initialState and cases.';

      assert.throws(() => { redeuceur(); }, Error, errMsg);
      assert.throws(() => { redeuceur(true); }, Error, errMsg);
    });

    it('Throws a TypeError if cases is not an array.', function () {
      const errMsg = 'Cases must be an array.';
      const invalid = [true, 1, 'a', {}, () => {}, null];

      invalid.forEach(x => {
        assert.throws(() => { redeuceur(true, x); }, TypeError, errMsg);
      });
    });

    it('Throws a TypeError if a case is not an array.', function () {
      const errMsg = 'Invalid case in cases. Each case must be an array.';
      const invalid = [true, 1, 'a', {}, () => {}, null];

      invalid.forEach(x => {
        // one invalid case
        assert.throws(() => { 
          redeuceur(true, [ x, ]); 
        }, TypeError, errMsg);

        // mix of invalid and valid cases
        assert.throws(() => { 
          const cases = [
            ['foo', true],
            x,
            ['bar', false],
          ];

          redeuceur(true, cases);
        }, TypeError, errMsg);
      });
    });

    it('Throws an Error if a case does not have a test and a handler.', function () {
      const errMsg = 'Each case must have a test and a handler.';

      assert.throws(() => { redeuceur(true, [[]]); }, Error, errMsg);
      assert.throws(() => { redeuceur(true, [['a']]); }, Error, errMsg);

    });

    it('Throws a TypeError if a case is not a valid type.', function () {
      const errMsg = 'Invalid case. Expected a string, an array of strings, or a function.';
      const handler = () => ({});
      const invalid = [true, 1, {}, () => {}, null];

      invalid.forEach(x => {
        assert.throws(() => { 
          redeuceur(true, [x, handler]);
        }, Error, errMsg);
      });
    });

    it('Returns a function.', function () {
      assert.isFunction(redeuceur(true, ['x', true]));
    });
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
