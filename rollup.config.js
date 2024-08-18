import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "esm",
      file: "dist/my-vue-library.esm.js",
    },
    {
      format: "cjs",
      file: "dist/my-vue-library.cjs.js",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: true } },
      useTsconfigDeclarationDir: true,
    }),
    vue(),
  ],
  external: ["vue"], // Исключаем Vue из сборки
};
