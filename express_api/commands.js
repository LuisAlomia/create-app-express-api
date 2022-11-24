const shell = require("shelljs");
const chalk = require("chalk");
const fs = require("fs");

const writeFiles = require("./src/files/files");
const database = require("./src/database/database");
const models = require("./src/api/models");
const validatorData = require("./src/api/middleware");
const tokenAndHash = require("./src/utils/tokenAndHash");
const api = require("./src/api/api");
const swagger = require("./src/docs/swagger.doc");

function commands(inputs) {
  //Name project
  const nameProject = inputs.nameProject.split(" ").join("");

  //Package JSON
  const description = inputs.description;
  const urlRepository = inputs.urlRepository;
  const author = inputs.author;

  //TYPE DB
  const typeDB = inputs.typeDB; // mongoose or none or sequelize

  //oPtionS env DB
  const dbUri = "mongodb://localhost:27017/test";

  const username = "username";
  const password = "password";
  const host = "localhost";
  const data_base = "test";
  const dialect = "postgres";

  //Create folders
  fs.mkdirSync(`${nameProject}`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/config`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/models`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/docs`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/controllers`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/services`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/routes`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/database`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/middleware`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/utils`, { recursive: true });
  fs.mkdirSync(`${nameProject}/src/validations`, { recursive: true });

  //Creator files
  writeFiles(
    nameProject,
    typeDB,
    dbUri,
    username,
    password,
    host,
    data_base,
    dialect,
    description,
    urlRepository,
    author
  );
  database(typeDB, nameProject);
  swagger(nameProject);
  models(typeDB, nameProject);
  validatorData(nameProject);
  tokenAndHash(nameProject);
  api(typeDB, nameProject);

  shell.echo(" ");
  shell.echo(chalk.red.bgGreen.bold(`  CONFIGURING PROJECT...  `));

  //Install libraries
  shell.cd(nameProject);
  if (typeDB === "sequelize") {
    shell.exec(
      "npm i express cors dotenv bcrypt jsonwebtoken express-validator swagger-jsdoc swagger-ui-express pg pg-hstore sequelize uuid -E"
    ); // cSpell:ignore hstore
  } else if (typeDB === "mongoose") {
    shell.exec(
      "npm i express cors dotenv bcrypt jsonwebtoken express-validator swagger-jsdoc swagger-ui-express mongoose -E"
    );
  } else {
    shell.exec("npm i express cors dotenv bcrypt jsonwebtoken  -E");
  }
  shell.exec("npm i nodemon eslint prettier eslint-config-prettier -D -E");

  shell.exec("npm run prettier");

  //Print in console results
  shell.echo("  ");
  shell.echo(chalk.red.bgGreen.bold(`  cd ${nameProject}  `));
  shell.echo("  ");
  shell.echo(
    chalk.bgRed(
      "  important: add environment variables in (.env) to connect to the database  "
    )
  );
  shell.echo("  ");
  shell.echo(chalk.bgGray("  npm run dev  "));
  shell.echo("  npm run start");
  shell.echo("  ");
  shell.echo(chalk.bgGreen.bold(" OK... "));
}

module.exports = commands;
