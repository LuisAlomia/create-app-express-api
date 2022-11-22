const shell = require("shelljs");
const fs = require("fs");

const writeFiles = require("./src/files/files");
const database = require("./src/database/database");
const models = require("./src/api/models");
const validatorData = require("./src/api/middleware")
const tokenAndHash = require("./src/utils/tokenAndHash");
const api = require("./src/api/api");

//Name project
const nameProject = "fidel";

//TYPE db
const typeDB = "mongoose"; // mongoose or none or sequelize

//oPtionS env DB
const dbUri = "mongodb://localhost:27017/test";

const username = "username";
const password = "password";
const host = "localhost";
const data_base = "test";
const dialect = "postgres";

//Create folders
fs.mkdirSync(`${nameProject}`, {recursive: true});
fs.mkdirSync(`${nameProject}/src/config`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/models`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/controllers`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/services`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/routes`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/database`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/middleware`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/utils`, { recursive: true });
fs.mkdirSync(`${nameProject}/src/validations`, { recursive: true });

//Creator files
writeFiles( nameProject, typeDB, dbUri, username, password, host, data_base, dialect );
database(typeDB, nameProject);
models(typeDB, nameProject);
validatorData(nameProject);
tokenAndHash(nameProject);
api(typeDB, nameProject);

//Install libraries
shell.cd(nameProject)
if (typeDB === "sequelize") {
    shell.exec("npm i express cors dotenv bcrypt uuid jsonwebtoken express-validator pg pg-hstore sequelize -E"); // cSpell:ignore hstore
} else if(typeDB === "mongoose") {
    shell.exec("npm i express cors dotenv bcrypt jsonwebtoken express-validator mongoose -E");
} else {
    shell.exec("npm i express cors dotenv bcrypt jsonwebtoken  -E");
}
shell.exec("npm i nodemon -D -E");

shell.echo(`npm cd ${nameProject}`);
shell.echo("npm run dev");
shell.echo("npm run start");
