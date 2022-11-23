const fs = require("fs");

function api(typeDB, nameProject) {
  let servicesUsers;
  let servicesAuth;

  if (typeDB === "sequelize") {
    servicesUsers = `const Users = require("../models/users.models");
        
        async function getAll(){
            const data = await Users.findAll({});
            return data;
        };
            
        async function getOne(id){
            const data = await Users.findOne({ where: { id } });
            return data;
        };
            
        async function deleteUser(id){
            const data = await Users.destroy({ where: { id } });
            return data;
        };


        module.exports = {getAll, getOne, deleteUser};
        `;

    servicesAuth = `const Users = require("../models/users.models");
        const uuid = require("uuid");
        const { hashedPassword, comparedPassword } = require("../utils/hashedPassword");
        const createToken = require("../utils/createToken");
        
        const register = async (data) => {
        const newUser = await Users.create({
            id: uuid.v4(),
            username: data.username,
            email: data.email,
            password: hashedPassword(data.password),
        });
        return newUser;
        };
        
        const login = async (email, plainPassword) => {
        const user = await Users.findOne({ where: { email } });
        
        if (!user) return { message: "Invalid Credentials" };
        
        const userValid = comparedPassword(plainPassword, user.password);
        
        return userValid
            ? createToken(user.id, user.username, user.role)
            : { message: "Invalid Credentials" };
        };
        
        module.exports = { register, login };
        `;
  } else if (typeDB === "mongoose") {
    servicesUsers = `const Users = require("../models/users.models");
    
        async function getAll(){
            const data = await Users.find({}, { password: 0 });
            return data;
        };
            
        async function getOne(id){
            const data = await Users.findOne({ _id: id }, { password: 0 });
            return data;
        };
            
        async function deleteUser(id){
            const data = await Users.deleteOne({ _id: id });
            return data;
        };
    
    
        module.exports = {getAll, getOne, deleteUser};
        `;

    servicesAuth = `const Users = require("../models/users.models");
        const { hashedPassword, comparedPassword } = require("../utils/hashedPassword");
        const createToken = require("../utils/createToken");
        
        const register = async (data) => {
        const newUser = await Users.create({
            username: data.username,
            email: data.email,
            password: hashedPassword(data.password),
        });
        return newUser;
        };
        
        const login = async (email, plainPassword) => {
        const user = await Users.findOne({ email });
        
        if (!user) return { message: "Invalid Credentials" };
        
        const userValid = comparedPassword(plainPassword, user.password);
        
        return userValid
            ? createToken(user.id, user.username, user.role)
            : { message: "Invalid Credentials" };
        };
        
        module.exports = { register, login };
        `;
  } else {
    servicesUsers = `//const Users = require(""); //import model
    
        const arrayUsers = [{id: 1, name: "user1"},{id: 2, name: "user2"},{id: 3, name: "user3"}];

        async function getAll(){
            const data = await arrayUsers
            return data;
        };
            
        async function getOne(id){
            const idNumber = Number(id)
            const data = await arrayUsers.filter(user => user.id === idNumber)
            return data;
        };
            
        async function deleteUser(id){
            const idNumber = Number(id)
            const data = await arrayUsers.filter(user => user.id !== idNumber);
            return data;
        };


        module.exports = {getAll, getOne, deleteUser};
        `;

    servicesAuth = `//const Users = require(""); //import model
        const { hashedPassword, comparedPassword } = require("../utils/hashedPassword");
        const createToken = require("../utils/createToken");
        
        const arrayUser = [] 

        async function register(data){
        const newUser = await arrayUser.push({
            username: data.username,
            email: data.email,
            password: hashedPassword(data.password),
        })
            
            return arrayUser;
        };
        
        async function login(email, plainPassword){
        const user = await arrayUser.filter(user => user.email === email);
        
        if (!user) return { message: "Invalid Credentials" };
        
        const userValid = comparedPassword(plainPassword, user.password);
        
        return userValid
            ? createToken(user.id, user.username, user.role)
            : { message: "Invalid Credentials" };
        };
        
        module.exports = { register, login };
        `;
  }

  fs.writeFileSync(
    `${nameProject}/src/services/user.services.js`,
    servicesUsers,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  fs.writeFileSync(
    `${nameProject}/src/services/auth.services.js`,
    servicesAuth,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  const controllersUsers = `const userServices = require("../services/user.services");

    const getAll = (_req, resp) => {
      userServices
        .getAll()
        .then((data) => resp.status(200).json(data))
        .catch((err) => resp.status(400).json({ message: err.message }));
    };
    
    const getOne = (req, resp) => {
        const { id } = req.params;
      
        userServices
          .getOne(id)
          .then((data) => {
            data
              ? resp.status(200).json(data)
              : resp.status(404).json({ message: "Invalid ID" });
          })
          .catch((err) => resp.status(400).json({ message: err.message }));
    };

    const deleteUser = (req, resp) => {
        const { id } = req.params;
      
        userServices
          .deleteUser(id)
          .then((data) => {
            data
              ? resp.status(201).json(data)
              : resp.status(404).json({ message: "Invalid ID" });
          })
          .catch((err) => resp.status(400).json({ message: err.message }));
    };

    module.exports = {getAll, getOne, deleteUser};
    `;
  fs.writeFileSync(
    `${nameProject}/src/controllers/user.controllers.js`,
    controllersUsers,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  const controllerAuth = `const authServices = require("../services/auth.services");

    const register = (req, resp) => {
    const { username, email, password } = req.body;

    authServices
        .register({ username, email, password })
        .then((data) => resp.status(201).json(data))
        .catch((err) => resp.status(400).json({ message: err.message }));
    };

    const login = (req, resp) => {
    const { email, password } = req.body;

    authServices
        .login(email, password)
        .then((data) => resp.status(201).json(data))
        .catch((err) => resp.status(400).json({ message: err.message }));
    };

    module.exports = { register, login };
    `;
  fs.writeFileSync(
    `${nameProject}/src/controllers/auth.controllers.js`,
    controllerAuth,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  const routesUsers = `const router = require("express").Router();
    
    const userControllers = require("../controllers/user.controllers");
    
    router.get("/", userControllers.getAll);
    
    router
      .route("/:id")
      .get(userControllers.getOne)
      .delete(userControllers.deleteUser);
    
    module.exports = router;

    //Documentations

    /**
     * users
     * @swagger
     * /api/v1/users:
     *  get:
     *    tags:
     *      - users
     *    summary: "Get users"
     *    description: Get all users
     *    responses:
     *      "200":
     *        description: "OK"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#components/schemas/user"
     *      "400":
     *        description: "Error"
     *    security:
     *      - Auth: []
     * /api/v1/users/{id}:
     *  get:
     *    tags:
     *      - users
     *    summary: "Get user by ID"
     *    description: Find user by ID
     *    parameters:
     *       - name: id
     *         in: path
     *         description: ID of user to return
     *         required: true
     *         schema:
     *            type: string
     *    responses:
     *      "200":
     *        description: "OK"
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#components/schemas/user"
     *      "404":
     *        description: "Invalid ID"
     *    security:
     *      - Auth: []
     *  delete:
     *    tags:
     *      - users
     *    summary: "Delete user by ID"
     *    description: Delete user by ID
     *    parameters:
     *       - name: api_key
     *         in: header
     *         description: ''
     *         required: false
     *         schema:
     *            type: string
     *       - name: id
     *         in: path
     *         description: user id to delete
     *         required: true
     *         schema:
     *            type: string
     *    responses:
     *      "204":
     *        description: "OK"
     *      "400":
     *        description: "Invalid ID"
     *    security:
     *      - Auth: []
     */

    `;
  fs.writeFileSync(
    `${nameProject}/src/routes/user.routes.js`,
    routesUsers,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );

  const routesAuth = `const router = require("express").Router();

    const authControllers = require("../controllers/auth.controllers");
    const { validateRegister, validateLogin } = require("../validations/validate");
    
    router
      .post("/register", validateRegister, authControllers.register)
      .post("/login", validateLogin, authControllers.login);
    
    module.exports = router;

    //Documentations

    /**
     * auth
     * @swagger
     * /api/v1/auth/register:
     *  post:
     *    tags:
     *      - auth
     *    summary: "Register new users"
     *    description: Add a new user
     *    requestBody:
     *       description: Create a new user in the database
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/user'
     *       required: true
     *    responses:
     *      "201":
     *        description: "create"
     *        content:
     *          application/json:
     *            schema:
     *              items:
     *                $ref: "#components/schemas/user"
     *      "400":
     *        description: "Invalid inputs"
     * /api/v1/auth/login:
     *  post:
     *    tags:
     *      - auth
     *    summary: "Login users"
     *    description: Login of user
     *    requestBody:
     *       description: Logout user
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/auth'
     *       required: true
     *    responses:
     *      "201":
     *        description: "Login"
     *        content:
     *          application/json:
     *            schema:
     *              items:
     *                $ref: "#components/schemas/auth"
     *      "400":
     *        description: "Invalid inputs"
     */

    `;
  fs.writeFileSync(
    `${nameProject}/src/routes/auth.routes.js`,
    routesAuth,
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
    }
  );
}

module.exports = api;
