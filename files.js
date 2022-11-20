const fs = require("fs");

function writeFiles() {
  /**
   * write app file (config app Express)
   */
  const appFile = `const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

module.exports = app;
`;
  fs.writeFileSync("src/app.js", appFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write index file (Run server)
   */
  const indexFile = `const app = require("./app");
const { port } = require("./config/env.config.js")

function server(){
  app.listen(port, () => {
    console.log("SERVER IN PORT: " + port);
  });
} 

server();
`;
  fs.writeFileSync("src/index.js", indexFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable config file
   */
  const configFile = `require("dotenv").config();

const config = {
  port: procces.env.PORT || 9001,
  db:{
    uri: procces.env.DB_URI || "http://uri.mogodb?example.com", //uri MongoDB Atlas
    username: procces.env.DB_USERNAME || "username",
    password: procces.env.DB_PASSWORD || "rood",
    host: procces.env.DB_HOST || "localhost",
    database: procces.env.DB_DATABASE || "test", //name data base 
  },
  secretOrKey: procces.env.JWT_SECRET || "private_Key_JWT"
}

module.exports = config;
`;
  fs.writeFileSync("./src/config/env.config.js", configFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write .gitignore file
   */
  const gitignoreFile = `node_modules
.env`;
  fs.writeFileSync(".gitignore", gitignoreFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable .env file
   */
  const envFile = `PORT = 9000
DB_URI = http://uri.mogodb?example.com

DB_USERNAME = username
DB_PASSWORD = passwor
DB_HOST = localhost
DB_DATABASE = test

JWT_SECRET = secret_key_jwt`;
  fs.writeFileSync(".env", envFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable example .env file
   */
  const envExampleFile = `PORT = 9000
DB_URI = http://uri.mogodb?example.com

DB_USERNAME = username
DB_PASSWORD = passwor
DB_HOST = localhost
DB_DATABASE = test

JWT_SECRET = secret_key_jwt`;
  fs.writeFileSync(".env.example", envExampleFile, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });
}

module.exports = writeFiles;
