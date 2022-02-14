// vytvořit server- místo využívání aplikace "200 ok"


// const http = require('http');
// const fs = require('fs');

// const port = 3000;

// const server = http.createServer(function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html' });
//   fs.readFile('index.html', function(error, data) {
//       if (error) {
//           res.writeHead(404);
//           res.write("nope");
//       } else {
//           res.write(data);
//       }
//         res.end();
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

// vždy musím napsat node app.js do terminálu
// --------------- kód výše na serveru zobrazil html BEZ stylu, 
// proto níže zkouším vytvořit server za pomoci npm balíčku Express ( npm install express do terminal) 
// style a js. mi to bere díky app.use(express.static) - více na https://expressjs.com/en/starter/static-files.html 

const express = require("express");
const app = express();
//console.dir(app);

const port = 3000;
const path = require("path");

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// app.use((req, res) => {
//   console.log("we got a new request");
//   // console.dir(req);
//   res.send("whooo, this is a response after your request");
  

// })

app.listen(port, () => {
  console.log("listening on http://localhost:" + port)
});