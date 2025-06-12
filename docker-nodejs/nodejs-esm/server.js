import http from 'node:http'
import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

console.log('🔌 Attempting to connect to database...')
let dbConnected = false

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed!')
    console.error('Error code:', err.code)
    console.error('Error message:', err.message)
    console.error('Error stack:', err.stack)
    return
  }
  dbConnected = true
  console.log('Connected as id ' + connection.threadId)
})

connection.on('error', (err) => {
  console.error('❌ Database connection error:', err)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    dbConnected = false
    console.log('Database connection lost')
  }
})

// Configure the HTTP server to respond with Hello World to all requests
const server = http.createServer((req, res) => {
  console.log(
    'Request from ' +
      (req.headers['x-forwarded-for'] || req.socket.remoteAddress)
  )

  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        status: 'ok',
        dbConnected,
        dbConnectionId: connection.threadId || 'Not connected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      })
    )
    console.log('Health check response sent')
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(
    JSON.stringify({
      data: 'Hello World!',
      dbConfig: {
        host: process.env.DB_HOST || 'DB_HOST not found',
        port: process.env.DB_PORT || 'DB_PORT not found',
        database: process.env.DB_DATABASE || 'DB_DATABASE not found',
        user: process.env.DB_USER || 'DB_USER not found',
        password: process.env.DB_PASSWORD ? '***' : 'DB_PASSWORD not found',
      },
      timestamp: new Date().toISOString(),
    })
  )

  console.log('Response sent..')
})

// Listen on port 8080, IP defaults to 127.0.0.1
const PORT = 8080
server.listen(PORT)
console.log('Server listening on port ', PORT)

// Handle SIGINT/SIGTERM
const sighandler = function () {
  console.log('Exiting..')
  // Close HTTP server first
  server.close(() => {
    console.log('🔌 HTTP server closed')
    connection.end((endErr) => {
      dbConnected = false
      if (endErr) {
        console.error('❌ Error closing connection:', endErr)
      } else {
        console.log('🔌 Database connection closed')
      }
    })
    process.exit(0)
  })
}
process.on('SIGINT', sighandler)
process.on('SIGTERM', sighandler)
