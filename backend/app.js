const express = require("express")
const morgan = require("morgan")

const musicRouter = require("./routes/musicRoutes")

const app = express()

// 1 MIDDLEWARES

app.use(morgan("dev"))
app.use(express.json())

app.use((req, res, next) => {
  console.log("hello from middleware")
  next()
})

app.use((req, res, next) => {
  req.requastTime = new Date().toISOString()
  next()
})

//3) ROUTES

app.use("/api/v1/musics", musicRouter)

module.exports = app
