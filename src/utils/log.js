// A utility function to log messages with a timestamp.
const logMessage = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${message}`);
};

// BUG: The developer is assigning the function to 'exports',
// which does not reassign the module's exported value.
// The require() call in index.js will receive an empty object by default.
module.exports = { logMessage };