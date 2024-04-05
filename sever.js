const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((request, response) => {
    const q = url.parse(request.url, true);
    let filePath;

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = __dirname + "/index.html";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write("404 Not Found!");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
      }
      response.end();
    });

    fs.appendFile(
      "log.txt",
      "URL: " + request.url + " - Timestamp: " + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added to log.");
        }
      }
    );
  })
  .listen(5500);
console.log("Server is running on Port 5500.");

console.log(q.host);
console.log(q.pathname);
console.log(q.search);
