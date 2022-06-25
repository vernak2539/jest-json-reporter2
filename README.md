# Jest JSON Reporter

[![Greenkeeper badge](https://badges.greenkeeper.io/vernak2539/jest-json-reporter2.svg)](https://greenkeeper.io/)

A reporter for jest that saves test results to JSON file.

## Installation

```
yarn add --dev jest-json-reporter2
```

## Usage

Add the following config to your `jest.config.js` or the Jest configuration in the `package.json`.

```javascript
// default options
const jsonreporter2Options = {
  outputDir: './coverage', // what directory to output to
  outputFile: 'test-results.json',  // what to call the file
  fullOutput: false // to output the full results from Jest or consolidated results
};

module.exports = {
  rootDir: process.cwd(),
  // ...other config

  // without options
  reporters: ['jest-json-reporter2']

  // with options
  reporters: [['jest-json-reporter2', jsonreporter2Options]]
};
```

### Full or Consolidated Output

We give you the option to output the full results returned by Jest or a consolidated view. See the options
above to see how to flip between outputs.

#### Consolidated Output

```js
{
  "suites": {
    "failed": 0,
    "skipped": 1,
    "success": 2
  },
  "tests": {
    "failed": 0,
    "skipped": 1,
    "success": 2
  },
  "startTime": 1520435906852,
}
```

#### Full Output

```js

{
  "numFailedTestSuites": 0,
  "numFailedTests": 0,
  "numPassedTestSuites": 1,
  "numPassedTests": 1,
  "numPendingTestSuites": 0,
  "numPendingTests": 0,
  "numRuntimeErrorTestSuites": 0,
  "numTotalTestSuites": 1,
  "numTotalTests": 1,
  "snapshot": {
    "added": 0,
    "didUpdate": false,
    "failure": false,
    "filesAdded": 0,
    "filesRemoved": 0,
    "filesUnmatched": 0,
    "filesUpdated": 0,
    "matched": 0,
    "total": 0,
    "unchecked": 0,
    "uncheckedKeys": [],
    "unmatched": 0,
    "updated": 0
  },
  "startTime": 1520435906852,
  "success": false,
  "testResults": [
    {
      "console": null,
      "failureMessage": null,
      "numFailingTests": 0,
      "numPassingTests": 1,
      "numPendingTests": 0,
      "perfStats": {
        "end": 1520435908707,
        "start": 1520435907548
      },
      "snapshot": {
        "added": 0,
        "fileDeleted": false,
        "matched": 0,
        "unchecked": 0,
        "unmatched": 0,
        "updated": 0,
        "uncheckedKeys": []
      },
      "testFilePath": "/Users/who/dir/__tests__/index.js",
      "testResults": [
        {
          "ancestorTitles": [],
          "duration": 8,
          "failureMessages": [],
          "fullName": "it should call the post route with the proper data",
          "location": null,
          "numPassingAsserts": 0,
          "status": "passed",
          "title": "it should call the post route with the proper data"
        }
      ],
      "sourceMaps": {},
      "skipped": false,
      "leaks": false
    }
  ],
  "wasInterrupted": false
}
```
