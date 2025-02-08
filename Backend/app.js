const express = require("express")
const app = express()
const UserApi = require("./route/user")
const TaskApi = require("./route/task")
require("dotenv").config()
require("./Connection/Connection")

// const cors = require('cors');

const cors = require("cors")
app.use(express.json())
app.use("/api/v1",UserApi)
app.use("/api/v2",TaskApi)
app.use(cors({ origin: "http://localhost:5173" }));

app.use(cors())
// app.use("/",(req,res)=>{
//     res.send("heello")
// })
const PORT = 1000

app.listen(PORT,()=>{
    console.log("server start")
})