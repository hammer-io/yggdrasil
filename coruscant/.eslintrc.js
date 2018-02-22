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
    "react/forbid-prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off" // This can get removed once we update beyond eslint-config-airbnb 16.1.0
  },
  "env": {
    "browser": true,
    "es6": true
  }
}