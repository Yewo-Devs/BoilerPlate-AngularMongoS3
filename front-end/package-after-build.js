const fs = require("fs");
const path = require("path");

const packagePath = path.join(
  __dirname,
  "dist",
  "front-end",
  "server",
  "package.json"
);
const packageContent = `{
  "name": "ssr-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.mjs"
  }
}`;

fs.writeFileSync(packagePath, packageContent, "utf8");
console.log(`package has been written to ${packagePath}`);
