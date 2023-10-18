require("express-async-errors")
require("dotenv/config")

const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const uploadConfig = require("./config/upload")
const cors = require("cors")

database()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes)
app.use(cors())

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`))