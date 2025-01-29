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

//_headers.txt

const headersPath = path.join(
  __dirname,
  "dist",
  "front-end",
  "browser",
  "_headers.txt"
);

const headersContent = `/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET
  Access-Control-Allow-Headers: Content-Type`;

fs.writeFileSync(headersPath, headersContent, "utf8");

console.log(`items have been written to static paths`);
