import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

/**
 * @type {import('rollup').InputOptions}
 */
const inputOptions = {
  input: './src/index.js',
  external: [],
  plugins: [resolve(), commonjs()],
};

/**
 * @type {import('rollup').OutputOptions[]}
 */
const outputOptionsList = [
  {
    dir: 'dist/es',
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: `chunk-[hash].js`,
    assetFileNames: 'assets/[name]-[hash][extname]',
    format: 'es',
    sourcemap: true,
    globals: {
      lodash: '_',
    },
  },
];

async function build() {
  let bundle;
  let bundleFailed = false;
  try {
    bundle = await rollup(inputOptions);
    for (const outputOption of outputOptionsList) {
      const { output } = await bundle.generate(outputOption);
      await bundle.write(outputOption);
    }
  } catch (error) {
    bundleFailed = true;
    console.error(error);
  }

  if (bundle) {
    await bundle.close();
  }
  process.exit(bundleFailed ? 1 : 0);
}

build();
