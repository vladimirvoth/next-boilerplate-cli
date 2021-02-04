#!/usr/bin/env node

const template = require('../../helpers/template.helper');

module.exports = function (options) {
  console.log(options);
  if (options.length > 1) {
    try {
      switch (options[0]) {
        case 'page':
          template.useTemplate('page', options[1], __dirname);
          template.useTemplate('test', options[1], __dirname);
          template.useTemplate('scss', options[1], __dirname);
          break;
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  } else {
    console.log('Please use generate page name');
  }
};
