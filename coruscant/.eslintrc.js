module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "import",
    "react",
    "jsx-a11y"
  ],
  "rules": {
    "linebreak-style": "off",
    "comma-dangle": "off",
    "no-console": "off",
    "consistent-return": "off",
    "semi": ["error", "never"],
    "react/jsx-filename-extension": "off",
    "no-shadow": "off",
    "react/forbid-prop-types": "off"
  },
  "env": {
    "browser": true,
    "es6": true
  }
}