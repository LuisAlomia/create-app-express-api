const shell = require("shelljs");
const fs = require("fs");

const writeFiles = require("./files");

fs.mkdirSync("src/config", { recursive: true });
fs.mkdirSync("src/models", { recursive: true });
fs.mkdirSync("src/controllers", { recursive: true });
fs.mkdirSync("src/services", { recursive: true });
fs.mkdirSync("src/routes", { recursive: true });
fs.mkdirSync("src/database", { recursive: true });
fs.mkdirSync("src/middleware", { recursive: true });
fs.mkdirSync("src/utils", { recursive: true });

writeFiles();

//shell.exec("npm i express corss dotenv -E");
//shell.exec("npm i nodemon -D -E");

shell.echo("npm run dev");
shell.echo("npm run start");
