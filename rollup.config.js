import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);
const plugins = [
  babel(babelrc()),
];

export default {
  entry: 'src/index.js',
  external,
  plugins,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'redeuceur',
      sourceMap: true,
    }, 
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
    }, 
  ]
}
