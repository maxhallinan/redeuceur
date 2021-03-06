import { 
  compose,
  identity,
  includes,
  isArray, 
  isFunction,
  isOneOfTypes,
  isString,
} from './util.js';

function validateHandler(handler) {
  if (!isArray(handler) || handler.length < 2) {
    throw new Error(
      `Invalid handler. Every handler must have a condition and a nextState.`
    ); 
  } 

  return handler;
}

function validateCondition(handler) {
  const validTypes = [ `array`, `function`, `string`, ];
  const isValidCondition = isOneOfTypes(validTypes, handler[0]);

  if (!isValidCondition) {
    throw new TypeError(
      `Invalid handler condition. A condition must be ` +
      `a string, an array of strings, or a function.`
    );
  }

  return handler;
}

const defaultHandler = [ () => true, identity, ];

function redeuceur(initialState, ...handlers) {
  handlers.forEach(compose(validateCondition, validateHandler));

  handlers = [ ...handlers, defaultHandler, ];

  return function (state = initialState, action = {}) {
    const handler = handlers.find(([ condition, ]) => {
      let isHandler = false;

      if (isString(condition)) {
        isHandler = condition === action.type;
      }

      if (isArray(condition)) {
        isHandler = includes(action.type, condition);
      }

      if (isFunction(condition)) {
        isHandler = condition(state, action);
      }

      return isHandler;
    });

    const nextState = isFunction(handler[1]) 
      ? handler[1](state, action) 
      : handler[1];

    return nextState;
  };
}

export default redeuceur;

