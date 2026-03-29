#!/usr/bin/env node
// Adds package.json to lib/cjs so Node knows it's CJS
const fs = require('fs')
const path = require('path')

const cjsDir = path.join(__dirname, '..', 'lib', 'cjs')
fs.writeFileSync(
  path.join(cjsDir, 'package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2)
)

// Add package.json to lib/esm so Node knows it's ESM
const esmDir = path.join(__dirname, '..', 'lib', 'esm')
fs.writeFileSync(
  path.join(esmDir, 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2)
)

console.log('✅ CJS/ESM package.json markers written')
