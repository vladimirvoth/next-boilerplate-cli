#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('../../lib/inquirer');
const cmd = require('node-cmd');

module.exports = function () {
  clear();

  console.log(
    '\n',
    '\n',
    chalk.yellow(
      figlet.textSync('Next.js Boilerplate cli', { horizontalLayout: 'full' })
    )
  );

  const run = async () => {
    const data = await inquirer.initProject();

    const git = `git clone git@github.com:vladimirvoth/next-boilerplate.git ${data.projectName}`;

    console.log(`Creating ${data.projectName} ...`);

    cmd.get(
      `
      ${git}
      cd ${data.projectName}
      rm -rf .git
    `,
      (err) => {
        if (!err) {
          console.log(`Install dependencies ...`);

          cmd.get(
            `
                cd ${data.projectName}
                yarn
              `,
            (err) => {
              if (!err) {
                console.log(
                  `Projekt ${data.projectName} successfully created!`
                );
              } else {
                console.log('error:', err);
              }
            }
          );
        } else {
          console.log('error:', err);
        }
      }
    );
  };

  run();
};
