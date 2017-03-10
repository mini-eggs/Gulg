import inquirer from "inquirer";
import cmd from "node-cmd";

function getTaskFromList(name, list) {
  return list.filter(o => o.name === name)[0];
}

export default options => {

  const promptOptions = {
    name: "Gulp task",
    message: "Choose a task",
    choices: options.map(o => o.name),
    type: "list",
    pageSize: options.length
  };

  return new Promise(async (resolve, reject) => {
    try {
      const chosen = await inquirer.prompt(promptOptions);
      resolve(getTaskFromList(chosen["Gulp task"], options));
    } catch (err) {
      reject('There was an issue running the command. Ensure Gulp is installed globally.');
    }
  });
};
