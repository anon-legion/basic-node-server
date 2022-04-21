const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;

const renderPage = (src, res) => {
  fs.readFile(src, (err, data) => {
    if (err) throw err;
    res.write(data);
    res.end();
  })
}

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  console.log(path);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  switch (path) {
    case '/':
      renderPage('./index.html', res);
      break;

    case '/about.html':
    case '/contact-me.html':
      renderPage(`.${path}`, res);
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      renderPage('./404.html', res);
      break;
  }
  
}).listen(port, (err) => err ? console.log(`Something went wrong: ${err}`) : console.log(`Server running on port ${port}`));