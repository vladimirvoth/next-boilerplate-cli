#!/usr/bin/env node

const args = process.argv;
let cmd = args[2];
const options = args.slice(3);

try {
  if (options.length > 0) {
    require('./commands/' + cmd)(options);
  } else {
    require('./commands/' + cmd)();
  }
} catch (error) {
  console.log(`ERROR: ${error}`);
}
