import fs from "fs";
import path from "path";
import HtmlMinifier from "html-minifier";
const HtmlMinifierOptions = { minifyJS: true, collapseWhitespace: true };
import replaceall from "replaceall";

class Tasks {
  constructor(props) {
    this.state = {
      base: props.base
    };
  }

  getDataFromFile(file) {
    let gulpfile = fs.readFileSync(path.join(file));
    gulpfile = gulpfile.toString("utf8");
    gulpfile = `<script>${gulpfile}</script>`;
    gulpfile = HtmlMinifier.minify(gulpfile, HtmlMinifierOptions);
    gulpfile = replaceall('"', "'", gulpfile);
    gulpfile = replaceall(" ", "", gulpfile);
    const gulpdata = gulpfile.split("require('");
    const gulprequires = [];

    for (const single of gulpdata) {
      if (single.includes("')")) {
        const anotherFile = single.split("')")[0];
        if (anotherFile.includes("./")) {
          // local file, lets read it
          gulprequires.push(anotherFile);
        }
      }
    }

    return {
      file: gulpfile,
      requires: gulprequires
    };
  }

  getTasks(string) {
    const stringdata = string.split(".task(");
    // first one is no good
    // throw it out with filter
    return stringdata
      .map((single, index) => {
        if (index === 0) return null;
        return single.split("'")[1];
      })
      .filter(n => n);
  }

  getTasksRecursive(file = this.state.base, tasks = []) {
    const data = this.getDataFromFile(file);
    const aTasks = this.getTasks(data.file);

    tasks = tasks.concat(
      aTasks.map(single => {
        return {
          name: single,
          file: file
        };
      })
    );

    for (const single of data.requires) {
      tasks = tasks.concat(this.getTasksRecursive(single, tasks));
    }

    return [...new Set(tasks)];
  }
}

export default () => {
  const base = path.join(process.cwd(), "gulpfile.js");
  const tasks = new Tasks({ base: base });
  return tasks.getTasksRecursive();
};
