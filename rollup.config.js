// rollup.config.js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts", // Or 'dist/esm/index.js' if you're bundling already compiled JS
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    typescript({
      exclude: [
        "**/__tests__/**",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/src/*.test.ts",
      ],
    }),
  ],
};
