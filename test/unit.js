const assert = require(`chai`).assert;
const redeuceur = require(`../dist`);

const handlerErr = 
  `Invalid handler. Every handler must have a condition and a nextState.`;
const conditionErr = 
  `Invalid handler condition. ` + 
  `A condition must be a string, an array of strings, or a function.`;

describe(`unit > redeuceur`, function () {
  let actionBar;
  let actionBaz;
  let actionFoo;
  let actionQux;
  let actionTypes;
  let initialState;

  before(function () {
    actionTypes = {
      FOO: `FOO`,
      BAR: `BAR`,
      BAZ: `BAZ`,
      QUX: `QUX`,
    };

    const qux = `qux`;

    actionFoo = { type: actionTypes.FOO, qux, };
    actionBar = { type: actionTypes.BAR, qux, };
    actionBaz = { type: actionTypes.BAZ, qux, };

    initialState = null;
  });

  it(`Throws a TypeError if a handler is not an array.`, function () {
    const invalid = [ true, 1, `a`, {}, () => {}, null, ];

    invalid.forEach(x => {
      assert.throws(() => { redeuceur(true, x ); }, Error, handlerErr);

      assert.throws(() => { 
        const handlers = [ [ `foo`, true, ], x, [ `bar`, false, ], ];

        redeuceur(true, ...handlers);
      }, Error, handlerErr);
    });
  });

  it(`Throws an Error if a handler does not have a condition and a nextState.`, function () {
    assert.throws(() => { redeuceur(true, []); }, Error, handlerErr);
    assert.throws(() => { redeuceur(true, [ [], ]); }, Error, handlerErr);
    assert.throws(() => { redeuceur(true, [ [ `a`, ], ]); }, Error, handlerErr);
  });

  it(`Throws a TypeError if a condition is not a valid type.`, function () {
    const nextState = () => ({});
    const invalid = [ true, 1, {}, null, ];

    invalid.forEach(x => {
      assert.throws(() => { 
        redeuceur(true, [ x, nextState, ]);
      }, TypeError, conditionErr);
    });
  });

  it(`Returns a reducer function.`, function () {
    assert.isFunction(redeuceur(true, [ `x`, true, ]));
  });

  it(`Reducer returns the initial state if called without an action argument.`, function () {
    const handler = [ actionTypes.FOO, true, ];
    const reducer = redeuceur(initialState, handler);
  
    assert.deepEqual(reducer(), initialState);
  });

  it(`Reducer matches a string condition against the action type.`, function () {
    const handler = [ 
      actionTypes.FOO, 
      (state, action) => action.qux, 
    ];

    const reducer = redeuceur(initialState, handler);

    assert.strictEqual(actionFoo.qux, reducer(initialState, actionFoo));
  });

  it(`Reducer matches an array of string conditions against the action type.`, function () {
    const handler = [
      [ actionTypes.BAR, actionTypes.BAZ, ],
      (state, action) => action.qux,
    ];
    const reducer = redeuceur(initialState, handler);

    assert.strictEqual(reducer(initialState, actionBar), actionBar.qux);
    assert.strictEqual(reducer(initialState, actionBaz), actionBaz.qux);
    assert.strictEqual(reducer(initialState, actionQux), initialState);
  });

  it(`Reducer returns nextState if the condition function returns a truthy value.`, function () {
    const handler = [
      (state, action) => action.type === actionTypes.FOO,
      (state, action) => action.qux,
    ];

    const reducer = redeuceur(initialState, handler);
    
    assert.strictEqual(reducer(initialState, actionFoo), actionFoo.qux);
  });

  it(`Reducer does not return nextState if the condition function returns a falsey value.`, function () {
    const handler = [
      (state, action) => action.type === actionTypes.BAR,
      (state, action) => action.qux,
    ];

    const reducer = redeuceur(initialState, handler);
    
    assert.strictEqual(reducer(initialState, actionFoo), initialState);
  });
  
  it(`Reducer returns the result of calling nextState if nextState is a function.`, function () {
    const handler = [
      actionTypes.FOO,
      (state, action) => action.qux,
    ];

    const reducer = redeuceur(initialState, handler);

    assert.strictEqual(reducer(initialState, actionFoo), `qux`);
  });

  it(`Reducer returns the nextState value if nextState is not a function.`, function () {
    const nextState = `foo bar baz`;

    const handler = [
      actionTypes.FOO, 
      nextState,
    ]; 

    const reducer = redeuceur(initialState, handler);

    assert.strictEqual(reducer(initialState, actionFoo), nextState);
  });

  it(`Reducer returns the current state if there's no condition match.`, function () {
    const state = `foo bar baz`;
    const getQux = (state, action) => action.qux;

    const handlers = [
      [ actionTypes.FOO, getQux, ],
      [ actionTypes.BAR, getQux, ],
      [ actionTypes.BAZ, getQux, ],
    ];

    const actionQux = { type: actionTypes.QUX, qux: `qux`, };
      
    const reducer = redeuceur(initialState, handlers);

    assert.strictEqual(reducer(state, actionQux), state);
  });
});

