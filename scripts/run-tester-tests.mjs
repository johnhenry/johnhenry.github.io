import recursiveFileMatch from "../std/js/recursive-file-match@0.0.0/index.mjs";

const startPath = "./std/js/";
const reg = /(.+)\.tester\.test\.mjs/;
for await (const file of recursiveFileMatch(startPath, reg)) {
  console.log(`running test: ${file}`);
  await import(`../${file}`);
}
