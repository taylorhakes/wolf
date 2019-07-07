#!/usr/bin/env node
const json = require('../build/asset-manifest.json');
const path = require('path');
const fs = require('fs');

const fileGroup = `/
/${json['main.css']}
/css/framework7-icons.css
/js/firebase-4.2.0.js
/${json['main.js']}
/fonts/Framework7Icons-Regular.woff2
`;

const manifest = `CACHE MANIFEST

CACHE:
${fileGroup}
# Use from network if available
NETWORK:
${fileGroup}`;

fs.writeFileSync(path.join(__dirname, '../build/manifest.appcache'), manifest);