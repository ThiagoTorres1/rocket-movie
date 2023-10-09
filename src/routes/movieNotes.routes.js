const {Router} = require("express")
const MovieNotesController = require("../controller/movieNotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const moviesRoutes = Router()

const movieController = new MovieNotesController()

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.post("/", movieController.create)
moviesRoutes.delete("/:id", movieController.delete)
moviesRoutes.get("/:id", movieController.show)
moviesRoutes.get("/", movieController.index)

module.exports = moviesRoutes