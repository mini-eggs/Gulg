import path from "path";
import Tasks from "./tasks";
import prompt from "./prompt";
import GulgError from "./error";
import Runner from "./runner";

class Gulg {

  constructor () {
    this.state = {
      tasks: [],
      chosen: null,
      error: null
    }
    this.Tasks = new Tasks({
      base: path.join(process.cwd(), "gulpfile.js")
    })
  }

  async list () {
    try {
      this.state.tasks = await this.Tasks.getAllTasks()
      this.state.chosen = await prompt( this.state.tasks )
      const runner = new Runner({
        directory: this.getDirectory(),
        task: this.state.chosen.name
      })
      runner.run()
    }
    catch (err) {
      new GulgError(err)
    }
  }

  getDirectory () {
    const task = this.state.chosen
    let dir = task.file.split("/");
    dir.pop();
    return dir.join("/");
  }

}

export default Gulg
