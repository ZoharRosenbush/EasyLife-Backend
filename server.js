const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

// Session setup
const session = expressSession({
    secret: 'coding',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

// Express App Configurations
app.use(express.json())
app.use(cookieParser())
app.use(session)
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:3030', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const transactionRoutes = require('./api/transaction/transaction.routes')
const customerRoutes = require('./api/customer/customer.routes')

const { connectSockets } = require('./services/socket.service')


// Routes
app.use('/api/transaction', transactionRoutes)
app.use('/api/customer', customerRoutes)
connectSockets(http, session)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

