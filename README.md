# CLI create-app-express-api

**create-app-express-api** is a CLI application that bootstraps your **NodeJS / Express** projects fast and easy.

Running a single command will get you a production-ready Node.js application installed and fully configured on your machine. The app comes with many built-in features, such as: **password encryption, request validation, API documentation, connection to database via ORM or ODM and a basic ready-to-run user CRUD.**

## Installing

Para usar la CLI, deberá instalarla globalmente a través de npm:

    npm install -g create-app-express-api

    npm i -g create-app-express-api

Once the CLI application is installed, all you have to do is run the **create-app-express-api** command to start a new project **Node-js with Express**

**Note:** **CLI** console applications must always be installed globally in order for them to run as commands, otherwise they won't work

## Quick Start

To create a project, simply run:

### Step 1

    - select a directory or folder in which you would like to start the project
    - open a git bash preference console
    - run the following command:  create-app-express-api
    - answer the following questions
        *  What is the name of the project
        *  Project description
        *  Url repository git
        *  Author's name
        *  ORM type for database (mongoose or sequelize)

    Note: if you just press the enter key the default name of the project will be test the database will be moongse and the other questions will be empty.

It will look like the image even though sequelize was selected for this case.

![](./src/assets/images/image1.PNG)

We wait a moment for the configurations to be made, install the libraries and create the file structure.

    test\
        .eslintrc.json
        .gitignore
        .env                     # Environment variables
        .package.json
         src\
            |--config\           # Setting environment variables
            |--controllers\      # Controllers
            |--database\         # Database configuration
            |--docs\             # Swagger configuration
            |--middleware\       # Custom validations middleware
            |--models\           # Mongoose or sequelize models
            |--routes\           # Routes
            |--services\         # Business logic
            |--utils\            # Utility functions (encryptions)
            |--validations\      # Request data validation schemas
            |--index.js          # Express app
            |--app.js            # App entry point

![](./src/assets/images/image2.PNG)

Once all the default configurations have been made and the dependencies installed, we will be ready to start the next step.

### Step 2

We enter the project folder with the command.

    cd test  (name folder)

We go to the **(.env)** file and configure the environment variables, in **especially the database credentials** as the case may be.

    - MONGO DATABASE
    DB_URI = mongodb://localhost:27017/test

    - SEQUELIZE DATABESE
    DB_USERNAME = username
    DB_PASSWORD = password
    DB_HOST = localhost
    DB_DATABASE = test
    DB_DIALECT = postgres

### Step 3

Once the database credentials are configured, we enter the following commands in the console to start the project.

    npm run dev
    npm run start

![](./src/assets/images/image3.PNG)
![](./src/assets/images/image4.PNG)

The application starts on port 9000 and connects to the database.
Others will have the link to open the page and once we enter we will see the following window in the browser

![](./src/assets/images/image5.PNG)

at this point we will only have to enter the route **http://localhost:9000/api/v1/docs/** to be able to see the documentation of the api and the CRUD of users with which it comes.

I hope you find it useful code

![](./src/assets/images/image6.PNG)

## Contribution

If you have any recommendations for what can be improved or added to the CLI, please feel free to open a pull request.

When creating a new branch please follow the feature/branch-name convention if it's a feature to be added or updated. Or if its related to fixing a bug bugfix/branch-name convention. All pull requests then will be directed towards the develop branch.

If you find any bugs, please open an issue.
