'use strict';

exports.command = 'import'

exports.describe = 'parses a csv to json for NAICS codes'

exports.builder = (argv) => {
    argv
        .option('entry', {
            demand: true,
            requiresArg: true,
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

  
  initialize() {
    let dataFile = this.entry;

    console.log('asfd');
    //let data = fs.readFileSync(dataFile)


  }

};

exports.handler = (argv) => {

  let importCmd = new ImportCommand(argv);
  importCmd.initialize();
};