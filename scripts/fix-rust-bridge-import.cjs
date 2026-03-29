const fs = require('fs');
const path = require('path');

function fixDir(dir, relPath) {
  const files = fs.readdirSync(dir);
  for(const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) {
      fixDir(full, relPath + '../');
    } else if(file.endsWith('.js')) {
      let c = fs.readFileSync(full, 'utf8');
      if(c.includes('whatsapp-rust-bridge')) {
        c = c.replace(/require\(['"]whatsapp-rust-bridge['"]\)/g, 
          `require('${relPath}vendor/whatsapp-rust-bridge.js')`);
        c = c.replace(/from ['"]whatsapp-rust-bridge['"]/g,
          `from '${relPath}vendor/whatsapp-rust-bridge.js'`);
        fs.writeFileSync(full, c);
        console.log('Fixed:', full);
      }
    }
  }
}

fixDir('lib/cjs', './');
fixDir('lib/esm', './');
console.log('All done!');
