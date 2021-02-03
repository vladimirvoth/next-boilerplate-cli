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
      }
    ];
    return inquirer.prompt(questions);
  }
};
