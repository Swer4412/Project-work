const express = require("express")
const app = express()

const cors = require("cors")

app.use(cors())

app.get("/api", (req, res) => {
    console.log("Chiamata get")
    res.json({msg:"ciao", list: ["primo", "secondo", "terzo"]})
})

app.listen(5000, () => {
    console.log("Server on port 5000")
})
