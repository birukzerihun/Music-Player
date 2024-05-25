const fs = require("fs")
const musicController = require("../controllers/musicController")

const express = require("express")

const router = express.Router()

router.param("id", musicController.checkId)
router
  .route("/")
  .get(musicController.getAllMusics)
  .post(musicController.checkBody, musicController.createMusic)

router
  .route("/:id")
  .get(musicController.getMusic)
  .patch(musicController.updateMusic)
  .delete(musicController.deleteMusic)

module.exports = router
