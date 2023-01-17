import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const buildOptions = {
  input: ['src/index.js', 'src/util.js'],
  output: [
    {
      dir: 'dist/es',
      format: 'esm',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), commonjs()],
};

export default buildOptions;
