const {Router} = require("express")

const SessionController = require("../controller/sessionController")

const sessionRouter = Router()
const sessionController = new SessionController()

sessionRouter.post("/", sessionController.create)

module.exports = sessionRouter