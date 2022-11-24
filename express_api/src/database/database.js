const fs = require("fs");

function database(typeDB, nameProject) {
  if (typeDB === "sequelize") {
    const sequelize = `const { db } = require("../config/env.config");
    const { Sequelize } = require("sequelize");
    
    const sequelize = new Sequelize({
      username: db.username,
      password: db.password,
      host: db.host,
      database: db.database,
      dialect: db.dialect,
    });
    
    const databaseConnect = async () => {
      try {
        await sequelize.authenticate();
        await sequelize.sync();
    
        console.log('DATABASE CONNECTED');
        console.log('DATABASE SYNCHRONIZED');
        console.log('http://localhost:9000/api/v1');
      } catch (err) {
        console.log(err);
      }
    };
    
    module.exports = { sequelize, databaseConnect };
    `;
    fs.writeFileSync(
      `${nameProject}/src/database/sequelize.js`,
      sequelize,
      (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      }
    );
  } else if (typeDB === "mongoose") {
    const mongoose = `const { db } = require("../config/env.config");
    const mongoose = require('mongoose');
  
    const databaseConnect = async () => {
      try {
        await mongoose.connect(db.uri);
        console.log('DATABASE CONNECTED');
        console.log('http://localhost:9000/api/v1');
      } catch (err) {
        console.log(err);
      }
    }
    
    module.exports = databaseConnect;
    `;
    fs.writeFileSync(
      `${nameProject}/src/database/mongoose.js`,
      mongoose,
      (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      }
    );
  } else {
    fs.writeFileSync(
      `${nameProject}/src/database/database.js`,
      "//config data base",
      (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      }
    );
  }
}

module.exports = database;
