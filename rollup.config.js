import ts from 'rollup-plugin-typescript2';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const metaUrl = fileURLToPath(import.meta.url);

const dirName = path.dirname(metaUrl);

console.log(import.meta.url, metaUrl, dirName);

export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(dirName, './dist/index.js'),
  },
  plugins: [ts()],
};
