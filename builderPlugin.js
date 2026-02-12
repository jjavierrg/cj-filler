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
      const serverUrl = process.env.GITHUB_SERVER_URL;
      // const repository = process.env.GITHUB_REPOSITORY; // owner/repo
      const repository = 'mara-r/cj-filler'; // hardcoded for transfer ownership to new org, should be removed once the repo is transferred

      if (!serverUrl || !repository) {
        console.warn('[ConcatAndReplacePlugin]: Missing GitHub environment variables');
        return callback();
      }

      // Base64 encoded header template to avoid searching for the header
      const encodedHeader = `Ly8gPT1Vc2VyU2NyaXB0PT0NCi8vIEBuYW1lICAgICAgICAgQ0ogRmlsbGVyDQovLyBAdmVyc2lvbiAgICAgIHt7cGFja2FnZS52ZXJzaW9ufX0NCi8vIEBkZXNjcmlwdGlvbiAgRmlsbCBjdXN0b21lciBqb3VybmV5IGZvcm0gd2l0aCBkYXRhIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkhIERvIG5vdCB1c2UgaW4gcHJvZHVjdGlvbiEgVXNlIGF0IHlvdXIgb3duIHJpc2shIFlvdSBoYXZlIGJlZW4gd2FybmVkIQ0KLy8gQGF1dGhvciAgICAgICB7e3BhY2thZ2UuYXV0aG9yfX0NCi8vIEBtYXRjaCAgICAgICAgaHR0cHM6Ly8qLnJhc3RyZWF0b3IuY29tL2RhdG9zLWNvbXBhcmF0aXZhKg0KLy8gQG1hdGNoICAgICAgICBodHRwczovLyoucmFzdHJlYXRvcmRldnRlc3QuY29tL2RhdG9zLWNvbXBhcmF0aXZhKg0KLy8gQG1hdGNoICAgICAgICBodHRwczovLyoucmFzdHJlYXRvcnRlc3QuY29tL2RhdG9zLWNvbXBhcmF0aXZhKg0KLy8gQG1hdGNoICAgICAgICBodHRwczovLyoucmFzdHJlYXRvci5jb20vZGF0b3MtY29tcGFyYXRpdmEqDQovLyBAbWF0Y2ggICAgICAgIGh0dHBzOi8vd3d3LnJhc3RyZWF0b3IuY29tL3NlZ3Vyb3MtZGUtY29jaGUvY2FsY3VsYXIqDQovLyBAbWF0Y2ggICAgICAgIGh0dHBzOi8vKi5yYXN0cmVhdG9ybG9jYWwuY29tL2RhdG9zLWNvbXBhcmF0aXZhKg0KLy8gQG1hdGNoICAgICAgICBodHRwczovLyoucmFzdHJlYXRvcmxvY2FsLmNvbTo1MTAzL2RhdG9zLWNvbXBhcmF0aXZhKg0KLy8gQGljb24gICAgICAgICBodHRwczovL3d3dy5yYXN0cmVhdG9yLmNvbS93cC1jb250ZW50L3RoZW1lcy9yYXN0cmVhdG9yL2Zhdmljb24tMzJ4MzIucG5nDQovLyBAZ3JhbnQgICAgICAgIG5vbmUNCi8vIEBkb3dubG9hZFVSTCAge3tkb3dubG9hZFVybH19DQovLyBAdXBkYXRlVVJMICAgIHt7ZG93bmxvYWRVcmx9fQ0KLy8gPT0vVXNlclNjcmlwdD09`;
      const header = atob(encodedHeader);

      if (!header) {
        console.warn('[ConcatAndReplacePlugin]: tampermonkeyHeader env var not set, skipping header addition');
        return callback();
      }

      // Replace {{package.*}} with values from package.json
      const packageJson = JSON.parse(readFileSync(this.packageJsonPath, 'utf8'));
      const regex = /{{package\.(.*?)}}/g;
      let replacedHeader = header.replace(regex, (_, key) => packageJson[key]);

      // Replace {{downloadUrl}} with the constructed download URL
      const releaseBaseUrl = `${serverUrl}/${repository}/releases/latest`;
      const downloadUrl = `${releaseBaseUrl}/download/cj-filler.user.js`;
      replacedHeader = replacedHeader.replace(/{{downloadUrl}}/g, downloadUrl);

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
