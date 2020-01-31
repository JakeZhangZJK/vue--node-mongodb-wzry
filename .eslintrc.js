module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
      "vue",
      ["async-await"],
    ],
  "rules": {
    "async-await/space-after-async": 2,
    "async-await/space-after-await": 2,
    "no-console": 0,
    "no-cond-assign": 0,
    "no-unused-vas":0,
    }
};