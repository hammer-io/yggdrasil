[![Build Status](https://travis-ci.org/hammer-io/yggdrasil.svg?branch=master)](https://travis-ci.org/hammer-io/yggdrasil)

# endor
A web API to generate node.js applications in an opinionated way.

### Installation

### Installation for Development
1. Fork this repository
2. Open your favorite terminal and go to the directory you want to install.
3. git clone https://github.com/username/yggdrasil
4 `cd yggdrasil/endor && npm install`
5. Follow the steps below to [set up the database](#setting-up-the-database)
6. You're all set!

### Usage
`npm start`: starts the API server on `localhost:3000`

`npm test`: runs the test suite

`npm run lint`: runs the linter


### Documentation

Documentation is generated and displayed using [apidoc](http://apidocjs.com/).

### Generate Documenation
Prereq: `npm install apidoc -g`
1. `cd /endor/`
2. `apidoc -i src/`

### View Documentation
1. `cd /endor/`
2. `npm start`
3. visit `localhost:3000/`



### Setting up the Database

First, create a file named "dbConfig.json" in the root directory of the project,
and fill it with the following contents (updating as necessary for your local database):

```json
{
  "database": "hammer_endor",
  "username": "root",
  "password": "root",
  "options": {
    "host": "localhost",
    "dialect": "mysql",
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
}
```

Finally, run `npm run createDB && npm run initDB` to create the database and
initialize the tables within it.

### Querying the Data Model

- [Sequelize Querying Tutorial](http://docs.sequelizejs.com/manual/tutorial/querying.html)
- [Various Sequelize Query Methods](http://docs.sequelizejs.com/class/lib/model.js~Model.html)

**Example Usage:**

```javascript
import sequelize from './db/sequelize';

// Query the model for all users with username = 'Jack'
// and then print all projects owned by those users
sequelize.User.findAll({
  where: { firstName: 'Jack' }
}).then((users) => {
  users.forEach((user) => {
    console.log(`[*] ${user.dataValues.username} owns the following:`);
    user.getProjectsOwned().then((projects) => {
      projects.forEach((project) => {
        console.log(`[*] ${project.dataValues.projectName}`);
      });
    })
  });
}).catch((err) => {
  console.error(err);
});
```
