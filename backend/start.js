const ts = require("typescript");
const fs = require("fs");
const path = require("path");

function reportDiagnostics(diagnostics){ 
    diagnostics.forEach(diagnostic => {
        let message = "Error";
        if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1})`;
        }
        message += ": " + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(message);
    });
}

function readConfigFile(configFileName) { 
    // Read config file
    const configFileText = fs.readFileSync(configFileName).toString();  

    // Parse JSON, after removing comments. Just fancier JSON.parse
    const result = ts.parseConfigFileTextToJson(configFileName, configFileText);
    const configObject = result.config;
    if (!configObject) {
        reportDiagnostics([result.error]);
        process.exit(1);;
    }

    // Extract config infromation
    const configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, path.dirname(configFileName));
    if (configParseResult.errors.length > 0) {
        reportDiagnostics(configParseResult.errors);
        process.exit(1);
    }
    return configParseResult;
}


function compile(configFileName) {
    console.log('read config')
    // Extract configuration from config file
    let config = readConfigFile(configFileName);

    console.log('build program filenames: ' + config.fileNames + ' options: '+ config.options);

    // Compile
    let program = ts.createProgram(config.fileNames, config.options);

    console.log('emit program');
    let emitResult = program.emit();

    console.log('report diagnostics');
    // Report errors
    reportDiagnostics(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics));

    console.log('report exit code');
    // Return code
    let exitCode = emitResult.emitSkipped ? 1 : 0;

    console.log('exit');
    //process.exit(exitCode);
}

compile(process.argv[2]);
require('./src/index.js');
