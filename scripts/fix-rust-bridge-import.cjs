const fs = require('fs');
const path = require('path');

function getDepth(filePath, baseDir) {
  const rel = path.relative(baseDir, path.dirname(filePath));
  return rel === '' ? 0 : rel.split(path.sep).length;
}

function fixDir(dir, baseDir) {
  const files = fs.readdirSync(dir);
  for(const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) {
      fixDir(full, baseDir);
    } else if(file.endsWith('.js')) {
      let c = fs.readFileSync(full, 'utf8');
      if(c.includes("'whatsapp-rust-bridge'") || c.includes('"whatsapp-rust-bridge"')) {
        const depth = getDepth(full, baseDir);
        const rel = '../'.repeat(depth) + 'vendor/whatsapp-rust-bridge.js';
        c = c.replace(/require\(["']whatsapp-rust-bridge["']\)/g, `require("${rel}")`);
        c = c.replace(/from ["']whatsapp-rust-bridge["']/g, `from "${rel}"`);
        fs.writeFileSync(full, c);
        console.log('Fixed:', full);
      }
    }
  }
}

const cjsDir = path.resolve(__dirname, '../lib/cjs');
const esmDir = path.resolve(__dirname, '../lib/esm');

fixDir(cjsDir, cjsDir);
fixDir(esmDir, esmDir);
console.log('All done!');
