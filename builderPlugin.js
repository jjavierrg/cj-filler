import { readFileSync, writeFileSync } from 'fs';

/**
 * ConcatAndReplacePlugin concatenates files and replaces {{version}} with version from package.json
 * @param {Object} options plugin options
 * @param {string[]} options.files source files to concat
 * @param {string} options.packageJsonPath path to package.json to get version from
 * @param {string} options.destinationFile path to output file
 * @returns {void}
 */
class ConcatAndReplacePlugin {
  constructor(options) {
    const { files, packageJsonPath, destinationFile } = options;
    this.files = files;
    this.packageJsonPath = packageJsonPath;
    this.destinationFile = destinationFile;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('ConcatAndReplacePlugin', (_, callback) => {

      // Concatenate files
      const concatenatedContent = this.files
        .map((file) => readFileSync(file, 'utf8'))
        .join('\n');

      // Replace {{version}} with version from package.json
      const packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf8'));
      let replacedContent = concatenatedContent.replace('{{package.version}}', packageJson.version);
      replacedContent = replacedContent.replace('{{package.author}}', packageJson.author);

      // Write to destination file
      writeFileSync(this.destinationFile, replacedContent, { encoding: 'utf8', flag: 'w', });

      callback();
    });
  }
}

export default ConcatAndReplacePlugin;
