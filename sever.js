const http = require("http");
const fs = require("fs");
const url = require("url");
let addr = request.url;
let q = new URL(addr, "http://localhost:8080");

http
  .createServer((request, response) => {
    let addr = request.url,
      q = new URL(addr, "http://localhost:8080");

    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);

    let qdata = q.query;
    console.log(qdata.month);

    filePath = "documentation";

    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = __dirname + "/index.html";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);
console.log("My first Node test server is running on Port 8080.");
