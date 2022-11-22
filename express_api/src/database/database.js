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
    
    const databaseConnect = () => {
     
        sequelize
          .authenticate()
          .then(() => console.log("DATABASE CONNECTED"))
          .catch((err) => console.error(err));
        
        sequelize
          .sync()
          .then(() => console.log("DATABASE SYNCHRONIZED"))
          .catch((err) => console.error(err));
    }
    
    module.exports = { sequelize, databaseConnect };
    `
    fs.writeFileSync(`${nameProject}/src/database/sequelize.js`, sequelize, (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      });
   } else if(typeDB === "mongoose" ){
    const mongoose = `const { db } = require("../config/env.config");
    const mongoose = require('mongoose');
  
    function databaseConnect(){
      mongoose
        .connect(db.uri)
        .then(() => console.log("DATABASE CONNECTED"))
        .catch((err) => console.error(err));
    }
    
    module.exports = databaseConnect;
    `
    fs.writeFileSync(`${nameProject}/src/database/mongoose.js`, mongoose, (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      }); 
   } else {
    fs.writeFileSync(`${nameProject}/src/database/database.js`, "//config data base", (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }); 
   }
}

module.exports = database;