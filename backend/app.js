const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

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

app.get("/api/v1/musics/:id", (req, res) => {
  const id = req.params.id * 1

  const music = musics.find((el) => el.id === id)

  // if (id > musics.length) {
  if (!music) {
    return res.status(404).json({ status: "fail", message: "Invalid Id" })
  }

  res.status(200).json({
    status: "success",
    data: {
      music,
    },
    // results: musics.length, data: { musics }
  })
})

app.post("/api/v1/musics", (req, res) => {
  // console.log(req.body)
  const newId = musics[musics.length - 1].id + 1
  const newMusic = Object.assign({ id: newId }, req.body)

  musics.push(newMusic)

  fs.writeFile(
    `${__dirname}/dev-data/musics-sample.json`,
    JSON.stringify(musics),
    (err) => {
      res.status(201).json({ status: "success", data: { music: newMusic } })
    }
  )
})

const port = 3000

app.listen(port, () => {
  console.log("app listening on port " + port)
})
