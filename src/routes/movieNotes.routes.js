const {Router} = require("express")
const MovieNotesController = require("../controller/movieNotesController")
const moviesRoutes = Router()

const movieController = new MovieNotesController()

moviesRoutes.post("/:user_id", movieController.create)
moviesRoutes.delete("/:id", movieController.delete)
moviesRoutes.get("/:id", movieController.show)
moviesRoutes.get("/", movieController.index)

module.exports = moviesRoutes