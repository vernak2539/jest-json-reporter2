const inTravis = process.env.TRAVIS === 'true';

module.exports = {
  rootDir: process.cwd(),
  verbose: true,
  collectCoverage: inTravis,
  coverageReporters: ['text'],
  silent: true
};
