const { 
  isArray, 
  isOneOfTypes,
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

function redeuceur(...args) {
  let [ initialState, handlers, ] = args;

  if (args.length < 2) {
    throw new Error(
      `redeuceur must be called with two arguments: initialState and handlers.`
    ); 
  }

  if (!isArray(handlers)) {
    throw new TypeError(
      `Invalid argument. handlers must be an array.`
    );
  }

  // for convenience, redeuceur accepts a single handler
  // e.g., `redeuceur(initialState, ['ACTION_TYPE', handleActionType])`
  if (!isArray(handlers[0])) {
    handlers = [ handlers, ]; 
  }

  handlers.forEach(validateHandler);

  return function () {
    return initialState; 
  };
}

module.exports = redeuceur;

