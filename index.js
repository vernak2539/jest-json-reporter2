const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class JsonReporter {
  constructor (globalConfig, options) {
    this._options = options;
  }
  onRunComplete (contexts, results) {
    const { outputDir = './coverage', outputFile = 'test-results.json', fullOutput = false } = this._options;

    mkdirp.sync(outputDir);

    const generalData = {
      tests: {
        failed: results.numFailedTests,
        skipped: results.numPendingTests,
        success: results.numPassedTests
      },
      suites: {
        failed: results.numFailedTestSuites,
        skipped: results.numPendingTestSuites,
        success: results.numPassedTestSuites
      }
    };

    const dataToWrite = fullOutput ? results : generalData;

    fs.writeFileSync(`${outputDir}/${outputFile}`, JSON.stringify(dataToWrite), 'utf-8');
  }
};
