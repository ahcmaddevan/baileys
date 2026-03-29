const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, '../node_modules/whatsapp-rust-bridge/package.json');

if(!fs.existsSync(pkgPath)) {
  console.log('whatsapp-rust-bridge not found, skipping patch');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if(!pkg.exports['.'].require) {
  pkg.exports['.'].require = './dist/index.js';
  pkg.main = './dist/index.js';
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('patched whatsapp-rust-bridge for CJS support');
} else {
  console.log('whatsapp-rust-bridge already patched');
}
