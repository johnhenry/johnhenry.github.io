import fs from "fs";
import path from "path";
import fse from "fs-extra";
import numlistCompare from "../std/js/numlist-compare@0.0.0/index.mjs";
import recursiveFileMatch from "../std/js/recursive-file-match@0.0.0/index.mjs";

const reg = /(.*)@(\d+\.\d+\.\d+)$/;

const mains = ["index.mjs", "index.ts", "mod.ts", "index.css", "index.html"];

const go = (
  startPath,
  REMOVE_FILES = [/(.+)\.test\.(.+)/, /(.+)\.stories\.(.+)/]
) => {
  const record = {};

  for (const directory of fs.readdirSync(startPath)) {
    const filename = path.join(startPath, directory);
    if (!reg.test(filename) || !fs.lstatSync(filename).isDirectory()) {
      continue;
    }
    const [, name, ver] = reg.exec(filename);
    const version = ver.split(".").map(Number);
    record[name] = record[name]
      ? record[name].push(version) && record[name]
      : [version];
  }

  for (const [name, versions] of Object.entries(record)) {
    const version = `${name}@${versions
      .sort(numlistCompare)
      [versions.length - 1].join(".")}`;
    const latest = `${name}@latest`;
    if (fs.existsSync(latest) && fs.lstatSync(latest).isDirectory()) {
      fse.removeSync(latest);
    }
    // copy latest version
    // console.log(`copying: ${version} => ${latest}`);
    fse.copySync(version, latest);
    // remove tests from latest version
    for (const expression of REMOVE_FILES) {
      for (const file of recursiveFileMatch(latest, expression)) {
        // console.log(`removing test: ${file}`);
        fse.removeSync(file);
      }
    }
  }
  const html = [];
  for (const [name, versions] of Object.entries(record)) {
    for (const version of versions) {
      const folder = `${name}@${version.join(".")}`;
      const main =
        mains.find((main) => {
          if (fs.existsSync(path.join(folder, main))) {
            return true;
          }
        }) || "";
      const url = path.join(folder, main);
      html.push(`<div><a href="/${url}">/${url}</a></div>`);
    }
  }
  const data = html.join("");
  fs.writeFileSync(path.join(startPath, "index.html"), data);
};

go("./std/js/");
go("./std/css/");
go("./std/html/");
go("./std/bash/");
