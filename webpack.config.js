import path from 'path';
import { fileURLToPath } from 'url';
import builderPlugin from './builderPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'filler.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new builderPlugin({
      packageJsonPath: './package.json',
      destinationFile: 'dist/cj-filler.user.js',
      files: [
        'template/cj-filler.header',
        'dist/filler.js',
      ]
    })
  ]
};