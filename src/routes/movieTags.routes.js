const {Router} = require("express")
const MovieTagsController = require("../controller/movieTagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const tagsRoutes = Router()

const tagController = new MovieTagsController()

tagsRoutes.get("/", ensureAuthenticated, tagController.index)

module.exports = tagsRoutes