const fs = require("fs")

function tokenAndHash(nameProject){
    const token = `const jwt = require("jsonwebtoken");
    const { secretOrKey } = require("../config/env.config");
    
    const createToken = (id, username, role) => {
      return jwt.sign({ id, username, role }, secretOrKey);
    };
    
    module.exports = createToken;
    
    `
    fs.writeFileSync(`${nameProject}/src/utils/createToken.js`, token, (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
    });

    const hash = `const bcrypt = require("bcrypt");

    hashedPassword = (password) => {
      return bcrypt.hashSync(password, 10);
    };
    
    comparedPassword = (plainPassword, hashPassword) => {
      return bcrypt.compareSync(plainPassword, hashPassword);
    };
    
    module.exports = { hashedPassword, comparedPassword };
    `
    fs.writeFileSync(`${nameProject}/src/utils/hashedPassword.js`, hash, (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
    });
} 

module.exports = tokenAndHash;