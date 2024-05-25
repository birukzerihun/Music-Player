const express = require("express")
const fs = require("fs")
const app = express()

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "hello from the server side", app: "Music Player" })
// })

// app.post("/", (req, res) => {
//   res.send("you can post to this end point")
// })

const musics = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/musics-sample.json`)
)

app.get("/api/v1/musics", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: musics.length, data: { musics } })
})

const port = 3000

app.listen(port, () => {
  console.log("app listening on port " + port)
})
