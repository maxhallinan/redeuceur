const { 
  identity,
  includes,
  isArray, 
  isFunction,
  isOneOfTypes,
  isString,
} = require(`./util.js`);

function validateHandler(handler, index) {
  if (!isArray(handler) || handler.length < 2) {
    throw new Error(
      `Invalid handler at index ${index}. ` + 
      `Every handler must have a condition and a nextState.`
    ); 
  } 

  const condition = handler[0];
  const validTypes = [ `array`, `function`, `string`, ];
  const isValidCondition = isOneOfTypes(validTypes, condition);

  if (!isValidCondition) {
    throw new TypeError(
      `Invalid handler condition at index ${index}. ` + 
      `A handler condition must be a string, an array of strings, or a function.`
    );
  }
}

const defaultHandler = [ () => true, identity, ];

function redeuceur(initialState, ...handlers) {
  handlers.forEach(validateHandler);

  handlers = [ ...handlers, defaultHandler, ];

  return function (state = initialState, action = {}) {
    const handler = handlers.find(([ condition, ]) => {
      if (isString(condition)) {
        return condition === action.type;
      }

      if (isArray(condition)) {
        return includes(action.type, condition);
      }

      if (isFunction(condition)) {
        return condition(state, action);
      }
    });

    const nextState = isFunction(handler[1]) 
      ? handler[1](state, action) 
      : handler[1];

    return nextState;
  };
}

module.exports = redeuceur;

