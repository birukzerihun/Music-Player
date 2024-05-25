const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log("hello from middleware")
  next()
})

app.use((req, res, next) => {
  req.requastTime = new Date().toISOString()
  next()
})

const musics = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/musics-sample.json`)
)

const getAllMusics = (req, res) => {
  console.log(req.requastTime)
  res.status(200).json({
    status: "success",
    requestedAt: req.requastTime,
    results: musics.length,
    data: { musics },
  })
}

const getMusic = (req, res) => {
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
}

const createMusic = (req, res) => {
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
}

const updateMusic = (req, res) => {
  if (req.params.id * 1 > musics.length) {
    return res.status(404).json({ status: "failed", message: "Invalid id" })
  }

  res
    .status(200)
    .json({ status: "success", data: { music: "<Updated Music>" } })
}

const deleteMusic = (req, res) => {
  if (req.params.id * 1 > musics.length) {
    return res.status(404).json({ status: "failed", message: "Invalid id" })
  }

  res.status(204).json({ status: "success", data: null })
}

app.route("/api/v1/musics").get(getAllMusics).post(createMusic)

app
  .route("/api/v1/musics/:id")
  .get(getMusic)
  .patch(updateMusic)
  .delete(deleteMusic)

const port = 3000

app.listen(port, () => {
  console.log("app listening on port " + port)
})
