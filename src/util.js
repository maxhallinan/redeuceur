const _ = module.exports;

_.includes = (x, arr) => arr.indexOf(x) > -1;

_.isArray = x => _.typeOf(x) === `array`;

_.isOneOfTypes = (types, x) => _.includes(_.typeOf(x), types);

_.log = (...logs) => x => console.log(...logs, x) || x;

_.typeOf = x  => (
  ({}).toString
  .call(x)
  .match(/\s([a-z|A-Z]+)/)[1]
  .toLowerCase()
);
