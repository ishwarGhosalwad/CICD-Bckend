const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");

fs.mkdirSync(distDir, { recursive: true });
fs.copyFileSync(path.join(srcDir, "app.js"), path.join(distDir, "app.js"));
fs.copyFileSync(path.join(rootDir, "package.json"), path.join(distDir, "package.json"));

console.log(`Build complete. Output: ${distDir}`);
