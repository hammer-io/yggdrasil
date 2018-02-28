# Coruscant

## Getting Started

```
> npm install
> npm start
```

## Configuration

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
