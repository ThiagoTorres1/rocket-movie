const express = require("express")
const database = require("./database/sqlite")

const app = express()
app.use(express.json())

database()

const PORT = 3333

app.listen(PORT, () => console.log(`Servidor funcionando na porta ${PORT}`))