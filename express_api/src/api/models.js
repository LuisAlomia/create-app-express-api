const fs = require("fs");

function models(typeDB, nameProject) {
  let model;
  if (typeDB === "sequelize") {
    model = `const { DataTypes } = require("sequelize");
        const { sequelize } = require("../database/sequelize");
        
        const Users = sequelize.define("users", {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          profileImage: {
            type: DataTypes.STRING,
            field: "profile_image",
            defaultValue: "https://placeimg.com/640/480/people",
          },
          role: {
            type: DataTypes.STRING,
            defaultValue: "user",
          },
          status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
          },
        });
        
        module.exports = Users;
        `;
  } else if (typeDB === "mongoose") {
    model = `const { Schema, model } = require("mongoose");

        const UserSchema = new Schema(
          {
            username: {
              type: String,
              required: true,
            },
            email: {
              type: String,
              required: true,
              unique: true,
            },
            password: {
              type: String,
              required: true,
            },
            role: {
              type: String,
              default: "user",
            },
            status: {
              type: Boolean,
              default: true,
            },
          },
          {
            timestamps: true,
            versionKey: false,
          }
        );
        
        const User = model("User", UserSchema);
        
        module.exports = User;`;
  } else {
    model = `"//create models"`;
  }
  fs.writeFileSync(
    `${nameProject}/src/models/users.models.js`,
    model,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );
}

module.exports = models;
