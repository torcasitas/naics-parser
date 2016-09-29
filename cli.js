#!/usr/bin/env node
var argv = require('yargs')
    .option('f', {
        alias: 'csv',
        requiresArg: true,
        describe: 'A csv file'
    })
    .command(require('./commands/import_cmd'))
    .command(require('./commands/export_cmd'))
    .command(require('./commands/publish_cmd'))
    .command(require('./commands/list_cmd'))
    .command(require('./commands/sync_cmd'))
    .command(require('./commands/analyze_cmd'))
    .command(require('./commands/pagify_cmd'))
    .global('t', 's')
    .help()
    .argv;
