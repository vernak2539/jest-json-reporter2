const Reporter = require('../index');
const mkdirp = require('mkdirp');
const fs = require('fs');

jest.mock('mkdirp', () => {
  return {
    sync: jest.fn()
  };
});
fs.writeFileSync = jest.fn();

const sampleResults = {
  numFailedTests: 0,
  numPendingTests: 1,
  numPassedTests: 2,
  numFailedTestSuites: 0,
  numPendingTestSuites: 1,
  numPassedTestSuites: 2,
  startTime: 1520435906852
};

afterEach(() => {
  mkdirp.sync.mockClear();
  fs.writeFileSync.mockClear();
});

test('it should set options at initialisation', () => {
  const sampleOptions = { test: true, other: 'yes' };

  const reporter = new Reporter({}, sampleOptions);

  expect(reporter._options).toBe(sampleOptions);
});

test('it should try to create requested output directory', () => {
  const sampleOptions = {
    outputDir: './testDir'
  };

  const reporter = new Reporter({}, sampleOptions);
  reporter.onRunComplete({}, sampleResults);

  expect(mkdirp.sync).toBeCalledWith(sampleOptions.outputDir);
});

test('it should try to create file in requested output directory', () => {
  const sampleOptions = {
    outputDir: './testDir',
    outputFile: 'test-file.json'
  };

  const reporter = new Reporter({}, sampleOptions);
  reporter.onRunComplete({}, sampleResults);

  expect(fs.writeFileSync).toBeCalledWith(
    `${sampleOptions.outputDir}/${sampleOptions.outputFile}`,
    expect.any(String),
    'utf-8'
  );
});

test('it should be save file with the right data', () => {
  const sampleOptions = {
    outputDir: './testDir',
    outputFile: 'test-file.json'
  };
  const expectedData = {
    tests: {
      failed: sampleResults.numFailedTests,
      skipped: sampleResults.numPendingTests,
      success: sampleResults.numPassedTests
    },
    suites: {
      failed: sampleResults.numFailedTestSuites,
      skipped: sampleResults.numPendingTestSuites,
      success: sampleResults.numPassedTestSuites
    },
    startTime: sampleResults.startTime
  };

  const reporter = new Reporter({}, sampleOptions);
  reporter.onRunComplete({}, sampleResults);

  expect(JSON.parse(fs.writeFileSync.mock.calls[0][1])).toEqual(expectedData);
});

test('it should be save file with the full output data', () => {
  const sampleOptions = {
    outputDir: './testDir',
    outputFile: 'test-file.json',
    fullOutput: true
  };
  const fullResults = { unmodifiedResults: true };
  const expectedData = { unmodifiedResults: true };

  const reporter = new Reporter({}, sampleOptions);
  reporter.onRunComplete({}, fullResults);

  expect(JSON.parse(fs.writeFileSync.mock.calls[0][1])).toEqual(expectedData);
});
