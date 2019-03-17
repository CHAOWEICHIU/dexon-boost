const {
  availableVersions,
  loadVersion,
} = require('./browserDSolc')

module.exports = {
  BrowserDSolc: {
    availableVersions: () => availableVersions,
    loadVersion,
  }
}
