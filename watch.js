import { watch } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const watcher = watch({
  input: './src/index.js',
  output: [
    { dir: 'dist/es', format: 'esm' },
    { dir: 'dist/cjs', format: 'cjs' },
  ],
  plugins: [resolve(), commonjs()],
  watch: {
    exclude: ['node_modules/**'],
    include: ['src/**'],
  },
});

watcher.on('restart', () => {
  console.log('rebuilding...');
});

watcher.on('change', (id) => {
  console.log('Module changed, id: ', id);
});

watcher.on('event', (e) => {
  if (e.code === 'BUNDLE_END') {
    console.log('Bundle info: ', e);
  }
});
