const fs = require("fs")
const musics = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/musics-sample.json`)
)

exports.checkId = (req, res, next, val) => {
  console.log(`the id is${val}`)
  if (req.params.id * 1 > musics.length) {
    return res.status(404).json({ status: "failed", message: "Invalid id" })
  }
  next()
}
exports.getAllMusics = (req, res) => {
  console.log(req.requastTime)
  res.status(200).json({
    status: "success",
    requestedAt: req.requastTime,
    results: musics.length,
    data: { musics },
  })
}

exports.getMusic = (req, res) => {
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

exports.createMusic = (req, res) => {
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

exports.updateMusic = (req, res) => {
  res
    .status(200)
    .json({ status: "success", data: { music: "<Updated Music>" } })
}

exports.deleteMusic = (req, res) => {
  res.status(204).json({ status: "success", data: null })
}
