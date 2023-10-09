const {Router} = require("express")
const usersRoutes = require("./user.routes")
const moviesRoutes = require("./movieNotes.routes")
const tagsRoutes = require("./movieTags.routes")
const sessionRoutes = require("./session.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/notes", moviesRoutes)
routes.use("/tags", tagsRoutes)
routes.use("/session", sessionRoutes)

module.exports = routes