// This exports the contents of config/development.json
// or config/production.json depending on whether `npm start`
// or `npm build` was run. The CONFIG variable is declared
// in webpack.dev.js and webpack.prod.js, depending the mode.

const config = CONFIG
export default config
