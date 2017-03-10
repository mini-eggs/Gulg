import cmd from "node-cmd";

class Runner {

  constructor (props) {
    this.state = {
      directory: props.directory,
      task: props.task
    }
  }

  run () {
    const {
      directory,
      task 
    } = this.state
    cmd.get(`cd ${directory} && gulp ${task}`, o => {
      this.output(o)
    });
  }

  output (gulpOutput) {
    console.log()
    console.log(`Running Gulp task '${this.state.task}'. 🙃`)
    console.log("Gulp output below.  ⬇️ ")
    console.log()
    console.log(gulpOutput);
    console.log()
  }

}

export default Runner
