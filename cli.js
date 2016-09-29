#!/usr/bin/env node
var argv = require('yargs')
    .option('f', {
        alias: 'csv',
        requiresArg: true,
        describe: 'A csv file'
    })
    .command(require('./commands/import_cmd'))
    .global('f')
    .help()
    .argv;
