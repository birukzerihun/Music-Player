const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "hello from the server side", app: "Music Player" })
})

app.post("/", (req, res) => {
  res.send("you can post to this end point")
})

const port = 3000

app.listen(port, () => {
  console.log("app listening on port " + port)
})
