//const chalk = require("chalk");
const inquirer = require("inquirer");

const commands = require("./commands");

async function program() {
  const resp = await inquirer.prompt([
    {
      type: "input",
      name: "nameProject",
      message: "What is the name of the project",
      default: "test",
    },
    {
      type: "input",
      name: "description",
      message: "Project description",
      default: "",
    },
    {
      type: "input",
      name: "urlRepository",
      message: "Url repository git",
      default: "",
    },
    {
      type: "input",
      name: "author",
      message: "Author's name",
      default: "",
    },
    {
      type: "list",
      name: "typeDB",
      message: "ORM type for database",
      choices: ["mongoose", "sequelize"],
    },
  ]);

  commands(resp);
}

module.exports = program;
