const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Adress of csv file to process: ', (name) => {
  console.log(`${name} is currently processing`);
  rl.close();
});

rl.on('close', () => {
  console.log('\nProcessing is completed!');
  process.exit(0);
});
