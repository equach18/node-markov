/** Command-line tool to generate Markov text. */

const fs = require("fs");
const process = require("process");
const axios = require("axios");
const markov = require("./markov");

function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

function fileText(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function webText(url) {
  try {
    let response = await axios.get(url);
    generateText(response.data);
  } catch (err) {
    console.error(`Error: ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[3];
let specification = process.argv[2];

if (specification === "url") {
  webText(path);
} else if (specification === "file") {
  fileText(path);
}else{
    console.error(`${specification} does not exist.`);
    process.exit(1)
}
