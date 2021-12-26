const express = require('express')
const app = express()
const server = require('http').createServer(app)
require('dotenv').config()
const PORT = process.env.PORT || 3000
const route = require("./routes/index")
const path = require("path")
const db = require("./db")
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')
const MemoryStore = require('session-memory-store')(expressSession)
db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cookieSession({
    secret: 'secret',
    store: new MemoryStore(60 * 60 * 12),
    cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

route(app)

server.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})