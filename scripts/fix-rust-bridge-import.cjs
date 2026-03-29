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
          path.join(baseDir, '..', 'vendor', 'whatsapp-rust-bridge-cjs.cjs')
        ).replace(/\\/g, '/');
        c = c.replace(/require\(["'].*?whatsapp-rust-bridge.*?["']\)/g, `require("${relToVendor}")`);
        c = c.replace(/from ["'].*?whatsapp-rust-bridge.*?["']/g, `from "${relToVendor}"`);
        fs.writeFileSync(full, c);
        console.log('Fixed:', full, '->', relToVendor);
      }
    }
  }
}

// CJS pakai wrapper .cjs
const cjsDir = path.resolve(__dirname, '../lib/cjs');
fixDir(cjsDir, cjsDir);

// ESM pakai file asli .js
const esmDir = path.resolve(__dirname, '../lib/esm');
const esmFiles = [];
function findEsmFiles(dir) {
  const files = fs.readdirSync(dir);
  for(const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) findEsmFiles(full);
    else if(file.endsWith('.js')) esmFiles.push(full);
  }
}
findEsmFiles(esmDir);
for(const full of esmFiles) {
  let c = fs.readFileSync(full, 'utf8');
  if(c.includes('whatsapp-rust-bridge')) {
    const relToVendor = path.relative(
      path.dirname(full),
      path.join(esmDir, '..', 'vendor', 'whatsapp-rust-bridge.js')
    ).replace(/\\/g, '/');
    c = c.replace(/from ["'].*?whatsapp-rust-bridge.*?["']/g, `from "${relToVendor}"`);
    fs.writeFileSync(full, c);
    console.log('Fixed ESM:', full, '->', relToVendor);
  }
}

console.log('All done!');
