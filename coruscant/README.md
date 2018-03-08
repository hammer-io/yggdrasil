[![Build Status](https://travis-ci.org/hammer-io/yggdrasil.svg?branch=master)](https://travis-ci.org/hammer-io/yggdrasil)

# yggdrasil

Connects the 9 worlds of microservices


## Getting Started

```
> npm install
> npm start
```


## Configuration

**TL;DR - You should copy the `config/default.json` file into all three config
files listed in the table below, and then fill in the development config with
real data.**

Project configuration is done in the `json` files in the `config` folder.
The `webpack.config.js` pulls in these files depending on the NODE_ENV environment
variable.

| NODE_ENV   | Config File Used          |
| ---------- | ----------------          |
| production | `config/production.json`  |
| test       | `config/test.json`        |
| *          | `config/development.json` |

If the `development.json` file doesn't exist, webpack will use the `default.json`
file that is committed with the repository. This file should never be edited: it's
only to be used as a template for creating the other config files.

Make sure to get the client IDs for any third-party clients (ask project owners or
create your own) and populate the development config file with those IDs.


## Setting up Firebase

1. Create a Firebase application
2. On the project overview page, click "Add Firebase to your web app"
3. Copy the configs, covert it to JSON, and put it in the `config/development.json` file
4. Click on Authentication from the left tray, and click Sign-in Method. Enable
   Email/Password sign-in.
5. When testing for development, you need to make sure to register a new user
   through the application sign-up process. This will authenticate the user with
   firebase. None of the test users (e.g. jreach) are setup with firebase, and
   the application will not work correctly for them.
   - After creating a new user in the app, you should stop the Endor service
     on your local machine and run `npm run addProjectsToTestUser <username>`,
     where `<username>` is the username of the user you just created. This will
     make him or her the project owner and collaborator of a few projects, as
     well as inviting him or her to a third project. Afterwards, you can start
     Endor again.
