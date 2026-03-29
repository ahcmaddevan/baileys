const fs = require('fs');
const path = require('path');

const possible = [
  path.resolve(__dirname, '../node_modules/whatsapp-rust-bridge/package.json'),
  path.resolve(process.cwd(), 'node_modules/whatsapp-rust-bridge/package.json')
];

let pkgPath = null;
for(const p of possible) {
  if(fs.existsSync(p)) { pkgPath = p; break; }
}

if(!pkgPath) {
  console.log('whatsapp-rust-bridge not found, skip');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.exports['.'].require = './dist/index.js';
pkg.exports['.'].default = './dist/index.js';
pkg.main = './dist/index.js';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('patched whatsapp-rust-bridge OK');
