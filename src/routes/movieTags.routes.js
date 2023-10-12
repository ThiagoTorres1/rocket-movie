const {Router} = require("express")
const MovieTagsController = require("../controller/movieTagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const tagsRoutes = Router()

const tagController = new MovieTagsController()

tagsRoutes.get("/:note_id", ensureAuthenticated, tagController.show)

module.exports = tagsRoutes