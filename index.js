// import chalk from 'chalk';
// console.log(chalk.blue('hello , world'));
// console.log(chalk.red.bold('this is an error message'));
// console.log(chalk.green.underline('this is sucss messgae'));
// function sum(a,b){
//     return a+b;
// }
// function product(a,b){
//     return a*b;
// }
// console.log(sum(2,3));
// console.log(product(2,3));

// const fs=require('fs');
// const path=require('path');
// console.log(__dirname);
// console.log(path.join(__dirname,"index.js"));


// const filePath=path.join(__dirname,"index.js");
// fs.readFile(filePath,'utf8',(err,data)=>{

// }

// assignement 1 for making a command line interface


const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of lines in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();