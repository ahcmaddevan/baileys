const fs = require('fs');
const path = require('path');

function fixDir(dir, baseDir) {
  const files = fs.readdirSync(dir);
  for(const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) {
      fixDir(full, baseDir);
    } else if(file.endsWith('.js')) {
      let c = fs.readFileSync(full, 'utf8');
      if(c.includes('whatsapp-rust-bridge')) {
        const relToVendor = path.relative(
          path.dirname(full),
          path.join(baseDir, '..', 'vendor', 'whatsapp-rust-bridge.js')
        ).replace(/\\/g, '/');
        c = c.replace(/require\(["'].*?whatsapp-rust-bridge.*?["']\)/g, `require("${relToVendor}")`);
        c = c.replace(/from ["'].*?whatsapp-rust-bridge.*?["']/g, `from "${relToVendor}"`);
        fs.writeFileSync(full, c);
        console.log('Fixed:', full, '->', relToVendor);
      }
    }
  }
}

const cjsDir = path.resolve(__dirname, '../lib/cjs');
const esmDir = path.resolve(__dirname, '../lib/esm');

fixDir(cjsDir, cjsDir);
fixDir(esmDir, esmDir);
console.log('All done!');
