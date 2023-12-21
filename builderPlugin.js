import { readFileSync, writeFileSync } from 'fs';

/**
 * ConcatAndReplacePlugin concatenates files and replaces {{version}} with version from package.json
 * @param {Object} options plugin options
 * @param {string} options.file source file
 * @param {string} options.packageJsonPath path to package.json to get version from
 * @returns {void}
 */
class ConcatAndReplacePlugin {
  constructor(options) {
    const { file, packageJsonPath } = options;
    this.file = file;
    this.packageJsonPath = packageJsonPath;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('ConcatAndReplacePlugin', (_, callback) => {
      const header = process.env.TAMPERMONKEY_HEADER;

      if (!header) {
        console.warn('[ConcatAndReplacePlugin]: tampermonkeyHeader env var not set, skipping header addition');
        return callback();
      }

      // Replace {{package.*}} with values from package.json
      const packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf8'));
      const regex = /{{package\.(.*?)}}/g;
      let replacedHeader = header.replace(regex, (_, key) => packageJson[key]);

      if (!replacedHeader.endsWith('\r\n') && !replacedHeader.endsWith('\n')) {
        replacedHeader += '\r\n';
      }

      console.log(`[ConcatAndReplacePlugin]: writing header to ${this.file}`);
      const fileContent = readFileSync(this.file, 'utf8');
      const newFileContent = replacedHeader + fileContent;
      writeFileSync(this.file, newFileContent, { encoding: 'utf8' });

      callback();
    });
  }
}

export default ConcatAndReplacePlugin;
