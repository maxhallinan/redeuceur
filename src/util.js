export const compose = (a, b) => x => a(b(x));

export const identity = x => x;

export const includes = (x, arr) => arr.indexOf(x) > -1;

export const isArray = x => typeOf(x) === `array`;

export const isFunction = x => typeOf(x) === `function`; 

export const isString = x => typeOf(x) === `string`; 

export const isOneOfTypes = (types, x) => includes(typeOf(x), types);

export const log = (...logs) => x => console.log(...logs, x) || x;

export const typeOf = x  => (
  ({}).toString
    .call(x)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase()
);

