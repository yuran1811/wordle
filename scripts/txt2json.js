import fs from 'node:fs';

const TXT_PATH = './scripts/data.txt';
const JSON_PATH = './src/redux/data.json';

const sanitizeRawData = (str) => str.replace(/[\s\n]{1,}/gi, ' ').toLowerCase();

const txt = fs.readFileSync(TXT_PATH, 'utf8');
const json = fs.readFileSync(JSON_PATH, 'utf8');

const sanitizedData = sanitizeRawData(txt);
const jsonData = JSON.parse(json);

const wordList = sanitizedData.split(' ');
const newJSON = JSON.stringify([...new Set([...wordList, ...jsonData])]);

fs.writeFileSync(TXT_PATH, sanitizedData);
fs.writeFileSync(JSON_PATH, newJSON);
