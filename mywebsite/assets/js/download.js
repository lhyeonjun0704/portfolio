var http = require('http');
var fs = require('fs');
const file_url = 'https://developerlee.herokuapp.com/';

function pDownload(url, dest){
  var file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.
    http.get(url, response => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          if(responseSent)  return;
          responseSent = true;
          resolve();
        });
      });
    }).on('error', err => {
        if(responseSent)  return;
        responseSent = true;
        reject(err);
    });
  });
}

//example
// pDownload(url, fileLocation)
//   .then( ()=> console.log('downloaded file no issues...'))
//   .catch( e => console.error('error while downloading', e));