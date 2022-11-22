const fs = require("fs");

function validatorData(nameProject) {
    const validate = `const { validationResult } = require("express-validator");

    const validateResult = (req, resp, next) => {
      try {
        validationResult(req).throw();
        return next();
      } catch (error) {
        resp.status(403).json({ message: error.array() });
      }
    };
    
    module.exports = validateResult;
    ` 
    fs.writeFileSync(`${nameProject}/src/middleware/validator.middleware.js`, validate, (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }
      });
} 

module.exports = validatorData;