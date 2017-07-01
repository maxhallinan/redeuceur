const assert = require('chai').assert;
const redeuceur = require('../dist');

describe('unit > redeuceur', function () {
  describe('> type signature', function () {
    it('Throws an Error if called without two arguments.', function () {
      const errMsg = 'redeuceur must be called with two arguments: initialState and handlers.';

      assert.throws(() => { redeuceur(); }, Error, errMsg);
      assert.throws(() => { redeuceur(true); }, Error, errMsg);
    });

    it('Throws a TypeError if handlers is not an array.', function () {
      const errMsg = 'Invalid argument. handlers must be an array.';
      const invalid = [true, 1, 'a', {}, () => {}, null];

      invalid.forEach(x => {
        assert.throws(() => { redeuceur(true, x); }, TypeError, errMsg);
      });
    });

    it('Throws a TypeError if a handler is not an array.', function () {
      const errMsg = index =>
        `Invalid handler at index ${index}. ` + 
        `Every handler must have a condition and a nextState.`; 
      const invalid = [true, 1, 'a', {}, () => {}, null];

      invalid.forEach(x => {
        // one invalid handler
        assert.throws(() => { 
          redeuceur(true, [ x, ]); 
        }, Error, errMsg(0));

        // mix of invalid and valid handlers
        assert.throws(() => { 
          const handlers = [
            ['foo', true],
            x,
            ['bar', false],
          ];

          redeuceur(true, handlers);
        }, Error, errMsg(1));
      });
    });

    it('Throws an Error if a handler does not have a condition and a nextState.', function () {
      const errMsg = 
        'Invalid handler at index 0. ' + 
        'Every handler must have a condition and a nextState.';

      assert.throws(() => { redeuceur(true, []); }, Error, errMsg);
      assert.throws(() => { redeuceur(true, [[]]); }, Error, errMsg);
      assert.throws(() => { redeuceur(true, [['a']]); }, Error, errMsg);

    });

    it('Throws a TypeError if a condition is not a valid type.', function () {
      const errMsg = 
        'Invalid handler condition at index 0. ' + 
        'A handler condition must be a string, an array of strings, or a function.';
      const handler = () => ({});
      const invalid = [true, 1, {}, null];

      invalid.forEach(x => {
        assert.throws(() => { 
          redeuceur(true, [x, handler]);
        }, TypeError, errMsg);
      });
    });

    it('Returns a function.', function () {
      assert.isFunction(redeuceur(true, ['x', true]));
    });
  });

  describe('> reducer function', function () {
    let actionBar;
    let actionBaz;
    let actionQux;
    let actionTypes;
    let initialState;

    before(function () {
      actionTypes = {
        FOO: 'FOO',
        BAR: 'BAR',
        BAZ: 'BAZ',
        QUX: 'QUX',
      };

      const qux = 'qux';

      actionFoo = { type: actionTypes.FOO, qux, };
      actionBar = { type: actionTypes.BAR, qux, };
      actionBaz = { type: actionTypes.BAZ, qux, };

      initialState = null;
    });

    it('Takes two arguments.', function () {
      const handler = [actionTypes.FOO, true];
      const reducer = redeuceur(initialState, handler);

      assert.strictEqual(reducer.length, 2);
    });

    it('Returns the initial state if called without an action argument.', function () {
      const handler = [actionTypes.FOO, true];
      const reducer = redeuceur(initialState, handler);
    
      assert.deepEqual(reducer(), initialState);
    });

    it('Matches a string condition against the action type.', function () {
      const handler = [ 
        actionTypes.FOO, 
        (state, action) => action.qux, 
      ];

      const reducer = redeuceur(initialState, handler);

      assert.strictEqual(actionFoo.qux, reducer(initialState, actionFoo));
    });

    it('Matches an array of string conditions against the action type.', function () {
      const handler = [
        [ actionTypes.BAR, actionTypes.BAZ, ],
        (state, action) => action.qux,
      ];
      const reducer = redeuceur(initialState, handler);

      assert.strictEqual(reducer(initialState, actionBar), actionBar.qux);
      assert.strictEqual(reducer(initialState, actionBaz), actionBaz.qux);
      assert.strictEqual(reducer(initialState, actionQux), initialState);
    });

    it('Returns nextState if the condition function returns a truthy value.', function () {
      const handler = [
        (state, action) => action.type === actionTypes.FOO,
        (state, action) => action.qux,
      ];

      const reducer = redeucer(initialState, handler);
      
      assert.strictEqual(reducer(initialState, actionFoo), actionFoo.qux);
    });

    it('Does not return nextState if the condition function returns a falsey value.', function () {
      const handler = [
        (state, action) => action.type === actionTypes.BAR,
        (state, action) => action.qux,
      ];

      const reducer = redeucer(initialState, handler);
      
      assert.strictEqual(reducer(initialState, actionFoo), initialState);
    });
    
    it('Returns the result of calling nextState if nextState is a function.', function () {
      const handler = [
        actionTypes.FOO,
        (state, action) => action.qux,
      ];

      const reducer = redeuceur(initialState, handler);

      assert.strictEqual(reducer(initialState, actionFoo));
    });

    it('Returns the nextState value if nextState is not a function.', function () {
      const nextState = 'foo bar baz';

      const handler = [
        actionTypes.FOO, 
        nextState,
      ]; 

      const reducer = redeuceur(initialState, handler);

      assert.strictEqual(redeucer(initialState, actionFoo), nextState);
    });

    it('Returns the current state if there\'s no condition match.', function () {
      const state = 'foo bar baz';
      const getQux = (state, action) => action.qux;

      const handlers = [
        [ actionTypes.FOO, getQux, ],
        [ actionTypes.BAR, getQux, ],
        [ actionTypes.BAZ, getQux, ],
      ];

      const actionQux = { type: actionTypes.QUX, qux: 'qux', };
       
      const reducer = redeuceur(initialState, handlers);

      assert.strictEqual(reducer(state, actionQux), state);
    });

    it('Memoizes the handler condition.', function () {});

    it('Memoizes the reducer call.', function () {});
  });
});
