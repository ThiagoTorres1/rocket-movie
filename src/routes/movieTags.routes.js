const {Router} = require("express")
const MovieTagsController = require("../controller/movieTagsController")
const tagsRoutes = Router()

const tagController = new MovieTagsController()

tagsRoutes.get("/:user_id", tagController.index)

module.exports = tagsRoutes