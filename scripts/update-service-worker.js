// import the manifest object that react-scripts creates. We'll use the values
// to populate the urlsToCache in our service worker.
const assetManifest = require('../build/asset-manifest.json');
const fs = require('fs');
const serviceWorkerPath = 'build/service-worker.js';

console.log('Starting the SW update');

const urls = Object.values(assetManifest.files).filter(name => !name.includes('.map'))

console.log(urls)

fs.readFile(serviceWorkerPath, "utf8", (err, data) => {
  if (err) {
    return console.log("Error trying to read SW file", err);
  }

  // Replaces the special string in the service worker with the CSV.
  const result = data.replace("%MANIFESTURLS%", JSON.stringify(urls));

  fs.writeFile(serviceWorkerPath, result, "utf8", err => {
    if (err) {
      return console.log("Error trying to write SW file", err);
    }
  });
});

console.log('Ran the SW update');
