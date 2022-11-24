const fs = require("fs");

function writeFiles(
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
) {
  /**
   * write app file (config app Express)
   */
  const app = `const express = require("express");
    const cors = require("cors");
    const swaggerUI = require("swagger-ui-express");

    const swaggerSetup = require("./docs/swagger");
    const userRoutes = require("./routes/user.routes")
    const authRoutes = require("./routes/auth.routes")

    const app = express();

    app.use(express.json());
    app.use(cors());

    //Routes api
    app.use("/api/v1/users", userRoutes)
    app.use("/api/v1/auth", authRoutes)

    //Documentation
    app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSetup));

    module.exports = app;
`;
  fs.writeFileSync(`${nameProject}/src/app.js`, app, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write index file (Run server)
   */
  let index;
  if (typeDB === "mongoose") {
    index = `const app = require("./app");
    const { port } = require("./config/env.config.js")
    const databaseConnect = require("./database/mongoose")
    
    const server = () => {

      app.get("/api/v1", (req, resp) => {
        resp
          .status(200)
          .json({
            message: "welcome create-app-express-api", 
            documentation: "http://localhost:9000/api/v1/docs/"});
      });

      app.listen(port, () => {
        console.log("SERVER IN PORT: " + port);
      });
      
      databaseConnect();
    } 
    
    server();
    `;
  } else if (typeDB === "sequelize") {
    index = `const app = require("./app");
    const { port } = require("./config/env.config.js")
    const { databaseConnect } = require("./database/sequelize")
    
    const server = () => {

      app.get("/api/v1", (req, resp) => {
        resp
          .status(200)
          .json({
            message: "welcome create-app-express-api", 
            documentation: "http://localhost:9000/api/v1/docs/"});
      });

      app.listen(port, () => {
        console.log("SERVER IN PORT: " + port);
      });

      databaseConnect();
    } 
    
    server();
    `;
  } else {
    index = `const app = require("./app");
    const { port } = require("./config/env.config.js")
    
    const server = () => {
      app.listen(port, () => {
        console.log("SERVER IN PORT: " + port);
      });
    } 
    
    server();
    `;
  }

  fs.writeFileSync(`${nameProject}/src/index.js`, index, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable config file
   */
  const config = `require("dotenv").config();

    const config = {
      port: process.env.PORT || 9001,
      db:{
        uri: process.env.DB_URI || "mongodb://localhost:27017/test", //uri mongodb or uri MongoDB Atlas
        username: process.env.DB_USERNAME || "username",
        password: process.env.DB_PASSWORD || "rood",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_DATABASE || "test", //name data base
        dialect: process.env.DB_DIALECT || "postgres", 
      },
      secretOrKey: process.env.JWT_SECRET || "private_Key_JWT",
    }

    module.exports = config;
  `;
  fs.writeFileSync(`${nameProject}/src/config/env.config.js`, config, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write .gitignore file
   */
  const gitignore = `node_modules
.env`;
  fs.writeFileSync(`${nameProject}/.gitignore`, gitignore, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable .env file
   */
  const env = `PORT = 9000
## MONGO DATABASE
DB_URI = ${dbUri}

## SEQUELIZE DATABESE
DB_USERNAME = ${username}
DB_PASSWORD = ${password}
DB_HOST = ${host}
DB_DATABASE = ${data_base}
DB_DIALECT = ${dialect}

## JSON WEB TOKEN
JWT_SECRET = secret_key_jwt`;
  fs.writeFileSync(`${nameProject}/.env`, env, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  /**
   * write environment variable example .env file
   */
  const envExample = `PORT = 9000

## MONGO DATABASE
DB_URI = mongodb://localhost:27017/test

## SEQUELIZE DATABESE
DB_USERNAME = username
DB_PASSWORD = password
DB_HOST = localhost
DB_DATABASE = test
DB_DIALECT = mySQL || postgres || mariaDB

## JSON WEB TOKEN
JWT_SECRET = secret_key_jwt`;
  fs.writeFileSync(`${nameProject}/.env.example`, envExample, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  const package = `{
  "name": "${nameProject}",
  "version": "1.0.0",
  "description": "${description}",
  "main": "index.js",
  "scripts": {
    "start": "node ./src/index.js",
    "dev": "nodemon ./src/index.js",
    "test": "",
    "lint": ${JSON.stringify('eslint "**/*.js" --ignore-path .gitignore')},
    "prettier": ${JSON.stringify(
      'prettier "**/*.js" --write --ignore-path .gitignore'
    )}
  },
  "repository": {
    "type": "git",
    "url": "${urlRepository}"
  },
  "keywords": [],
  "author": "${author}",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {

  }
}
    `;
  fs.writeFileSync(`${nameProject}/package.json`, package, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  const validate = `const { check } = require("express-validator");
    const validateResult = require("../middleware/validator.middleware");
    
    const validateRegister = [
      check("username").exists().notEmpty().trim().isString(),
      check("email").exists().notEmpty().trim().isString(),
      check("password").exists().notEmpty().trim().isString(),
      (req, resp, next) => validateResult(req, resp, next),
    ];

    const validateLogin = [
      check("email").exists().notEmpty().trim().isString(),
      check("password").exists().notEmpty().trim().isString(),
      (req, resp, next) => validateResult(req, resp, next),
    ];
    
    module.exports = { validateRegister, validateLogin }
    `;
  fs.writeFileSync(
    `${nameProject}/src/validations/validate.js`,
    validate,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  const eslintrc = `{
  "env": {
      "commonjs": true,
      "es2021": true,
      "node": true
  },
  "extends": "eslint:recommended",
  "overrides": [
  ],
  "parserOptions": {
      "ecmaVersion": "latest"
  },
  "rules": {
  }
}`;
  fs.writeFileSync(`${nameProject}/.eslintrc.json`, eslintrc, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });

  const prettier = `{
  "trailingComma": "es5",
  "tabWidth": 2, 
  "semi": true, 
  "singleQuote": true 
}`;
  fs.writeFileSync(`${nameProject}/.prettierrc.json`, prettier, (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
  });
}

module.exports = writeFiles;
