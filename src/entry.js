import tasks from './tasks';
import prompt from './prompt';
import cmd from 'node-cmd';

function runTask (task) {
  let dir = task.file.split('/')
  dir.pop()
  dir = dir.join('/')
  console.log()
  console.log(`Firing task ${task.name}  🙃`)
  console.log()
  cmd.get(`cd ${dir} && gulp ${task.name}`, consoleOutput => {
    console.log('Gulp output below: ');
    console.log();
    console.log(consoleOutput);
    console.log();
  });
}

function errorHandler (err) {
  console.log();
  console.log('Something went wrong. Error below:');
  console.log(err);
  console.log();
}

async function main () {
  let aTasks;

  try {
    aTasks = tasks()
  }
  catch (err) {
    errorHandler('No gulpfile.js was found. If there is a gulpfile.js in the current directory feel free to open an issue in our repo.')
    return;
  }

  const task = prompt(aTasks)

  try {
    runTask(await task)
  }
  catch (err) {
    errorHandler('There was an issue running the Gulp task. Ensure Gulp is installed globally. Feel free to open an issue in our repo.')
    return;
  }

}

export default main()
