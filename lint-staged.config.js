"use strict";

module.exports = {
  "src/**/*.{js,mjs,jsx}": [
    "prettier --list-different",
    "eslint --report-unused-disable-directives --ignore-path .eslintignore"
  ],
  "*.{md,markdown,mdown,mkdn,mkd,mdwn,mkdown,ron}": [
    "prettier --list-different",
    "remark -f -q"
  ]
};
