#!/usr/bin/env node

const template = require('./helper/template.helper');

const title = process.argv[3];

try {
  switch (process.argv[2]) {
    case 'page':
      template.useTemplate('page', title, __dirname);
      template.useTemplate('test', title, __dirname);
      template.useTemplate('scss', title, __dirname);
      break;
  }
} catch {
  console.log('Please use generate [page | form] name');
}
