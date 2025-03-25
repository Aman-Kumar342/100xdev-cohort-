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

const fs=require('fs');
const path=require('path');
console.log(__dirname);
console.log(path.join(__dirname,"index.js"));


// const filePath=path.join(__dirname,"index.js");
// fs.readFile(filePath,'utf8',(err,data)=>{

// }