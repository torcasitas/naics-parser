'use strict';

exports.command = 'import'
exports.describe = 'parses a csv to json for NAICS codes'

exports.builder = (argv) => {
  argv
    .option('entry', {
        demand: true,
        requiresArg: false,
        describe: 'the csv file to be parsed'
    });
  return argv;
};

let fs = require('fs'),
    process = require('process'),
    util = require('util'),
    Baby = require('babyparse'),
    _ = require('lodash'),
    Promise = require('bluebird');


class ImportCommand {
  constructor(argv) {
    this.entry = argv.entry;
  }
  
  process() {
    let data = fs.readFileSync(this.entry);
    let parsed = Baby.parse(data.toString(), {header: false, delimiter: ','});
    let output = [];

    if (parsed.errors.length === 0) {

      // col[0] - main category key
      // col[1] - specialty/subcategory key
      // col[2] - Main category name if specialty/subcategory key not present,
      //        - Specialty name if specialty/subcategory key present
      // col[3] - Sub category name 

      let category;
      let subcategory;
      let mainCat = false;
      let currentKey;

      for (let cols of parsed.data) {
        // console.log('row ' + cols + ' isMain ' + ((cols[0]) ? ' MAIN ' : 'specialty' ));
        if (cols[0]) {
          category = {};
          category[cols[0]] = cols[2].trim()
          // category.name = cols[2].trim();
          category.subcategories = [];
          output.push(category); 

          // let notEmptyCategory = Object.keys(category).length > 0; 
          // if (notEmptyCategory) {
          //   console.log('como crees');
            
          // } else {
            
          // }
          
        } else {
          if (cols[3] && cols[1] !== currentKey) {  // Specialties
            subcategory = {}
            subcategory[cols[1]] = cols[3].trim();
            subcategory.specialties = [];
            currentKey = cols[1];
            subcategory.specialties.push(cols[2].trim());
            category.subcategories.push(subcategory);
          } else {
            // console.log('same key');
            subcategory.specialties.push(cols[2].trim());   
          }  
        }
        
      }

      fs.writeFile('output.json', JSON.stringify(output, null, 2), (err, data) => {
        if (err) {
          return console.log('error: ' + err);
        }
        console.log('Successfully written to output.json');
      });
      // console.log('**************');
      // console.log(util.inspect(output, {depth:10, colors: true}));
    }
  }
};

exports.handler = (argv) => {
  let importCmd = new ImportCommand(argv);
  importCmd.process();
};