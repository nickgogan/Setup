// @ts-check

import path from 'path';
import fs from 'fs-extra';

export default dir => {
  let cssfiles = []; // eslint-disable-line

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    cssfiles = files.filter(file => path.extname(file) === '.css');
    cssfiles.forEach(cssfile => {
      let content = fs.readFileSync(path.join(dir, cssfile), 'utf-8'); // eslint-disable-line `dist/${cssfile}`
      content = content.replace(/\\/g, '/');

      fs.writeFileSync(path.join(dir, cssfile), content);
    });
  });
};
