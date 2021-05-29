const inquirer = require('inquirer');

module.exports = {
  initProject: () => {
    const questions = [
      {
        name: 'projectName',
        type: 'input',
        message: 'Enter a name for your project:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for your project.';
          }
        }
      },
      {
        name: 'withStorybook',
        type: 'list',
        message: 'Do you want to install Storybook?',
        choices: ['yes', 'no'],
        default: 'no'
      }
    ];
    return inquirer.prompt(questions);
  }
};
