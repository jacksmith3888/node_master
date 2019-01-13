// export * from './lib/async';
// export * from './lib/hash';
// export * from './lib/number';


import http from 'http'
import url from 'url'

const server = http.createServer((req, res) => {
  // Get and Parse URL
  const parsedUrl = url.parse(req.url, true)
  // when we set the second param to true, it will parse the query string
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  console.log(trimmedPath);
  console.log('abcabc');

  // Get path

  // Send response
  res.end('Hello World\n')

  // Log request path
  // console.log('Request received on path: ' + trimmedPath);
})

server.listen(3001, function() {
  console.log('the server is listening on 3001 now');
})
