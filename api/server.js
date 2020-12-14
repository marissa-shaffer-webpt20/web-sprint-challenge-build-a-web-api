const express = require('express');
const cors = require("cors")
const projectRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

const server = express();

server.use(express.json())
server.use(cors())

server.use("/projects", projectRouter)
server.use("/actions", actionsRouter)

server.use((err, req, res) => {
    console.log(err)
    res.status(500).json({
        message: "Error"
    })
  })
  
server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to our Projects API'
    })
  });
  

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
