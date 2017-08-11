#! /usr/bin/env node

const path = require('path');

const program = require('commander');
const pkg = require('../package.json');

const AddESLintComment = require('../index');

program
  .version(pkg.version)
  .option('-j --json <path>', 'the input json file')
  .parse(process.argv);

if (!program.json) {
  throw new Error('You must specify a valid input json file');
}

const jsonFilePath = path.resolve(program.json);
const eslintResultJSON = require(jsonFilePath);

const addESLintComment = new AddESLintComment();

addESLintComment.byESLintResultJSON(eslintResultJSON);
