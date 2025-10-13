// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts', // Or 'dist/esm/index.js' if you're bundling already compiled JS
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [typescript()], // If you're compiling TypeScript directly with Rollup
};