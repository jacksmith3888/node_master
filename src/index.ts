import http from 'http'
import url from 'url'
import { StringDecoder } from 'string_decoder'

const server = http.createServer((req, res) => {
  // Get and Parse URL
  // when we set the second param to true, it will parse the query string
  const parsedUrl = url.parse(req.url, true)
  // Get path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  // Get the querystring

  const queryString = parsedUrl.query

  const method = req.method.toLowerCase()
  // console.log(`request is received on ${trimmedPath},with method: ${method}`)

  const headers = req.headers

  const decoder = new StringDecoder('utf-8')
  let buffer:string = ''
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })

  req.on('end', () => {
    buffer += decoder.end()

    const chosenHandler = router[trimmedPath] ? router[trimmedPath] : handlers.notFound
    const data = {
      trimmedPath,
      queryString,
      method,
      headers,
      payload:buffer
    }
    chosenHandler(data,(statusCode:number = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload)
      res.writeHead(statusCode)

      // Send response
      res.end(payloadString)
      console.log('returning',payloadString)

    })
  })
})

server.listen(3001, function() {
  console.log('the server is listening on 3001 now')
})

const handlers = {
  sample: (data, cb) => {
    cb(406, { name: 'sample'})
  },
  notFound: (data, cb) => {
    cb(404)
  }
}

const router = {
  sample: handlers.sample
}
