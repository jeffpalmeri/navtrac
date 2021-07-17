// https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv

const papa = require('papaparse');
const request = require('request');
const fs = require('fs');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const readline = require('readline');

const options = {};

const processData = (csvAddress) => {
  const dataStream = request.get(csvAddress);
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

  dataStream.pipe(parseStream);

  parseStream.on('data', (chunk) => {
    const newLine = chunk.join(',');
    console.log('newLine: ', newLine);

    const entry = {
      id: uuidv4(),
      key: '',
      encrypted_value: md5(newLine[0]),
      comment: '',
      created_at: new Date(),
      updated_at: null,
    };

    const lineArrForDatabase = Object.keys(entry).map((key) => entry[key]);
    const lineForDatabase = lineArrForDatabase.join(',');

    const databasePath = 'src/database/postgres.csv';
    fs.appendFile(databasePath, `${lineForDatabase}${os.EOL}`, (err) => {
      if (err) {
        console.error('An error ocurred: ', err);
      } else {
        console.info('Data appended');
      }
    });
  });

  parseStream.on('finish', () => {
    console.log('Finished proccessing');
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Adress of csv file to process: ', (address) => {
  console.log(`${address} is currently processing`);
  processData(address);
  rl.close();
});

rl.on('close', () => {
  console.log('\nProcessing is completed!');
  process.exit(0);
});
