const fs = require("fs");

function swagger(nameProject) {
    const docConfig = `const swaggerJSDoc = require("swagger-jsdoc");

    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "${nameProject} API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
        {
          url: "http://localhost:9000",
        },
      ],
      components: {
        securitySchemes: {
          Auth: {
            type: "http",
            scheme: "jwt",
          },
        },
        schemas: {
          user: {
            type: "object",
            required: ["username", "email", "password"],
            properties: {
              username: {
                type: "string",
              },
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
          auth: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
        },
      },
    };
    
    const swaggerOptions = {
      swaggerDefinition,
      apis: ["./src/routes/*.js"],
    };
    
    module.exports = swaggerJSDoc(swaggerOptions);
    `
    fs.writeFileSync(`${nameProject}/src/docs/swagger.js`, docConfig,  (err) => {
        if (err) {
          console.log(`Error: ${err}`);
        }

    })
} 

module.exports = swagger;