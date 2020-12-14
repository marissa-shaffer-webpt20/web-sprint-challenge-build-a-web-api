const express = require('express');
const cors = require("cors")
const projectRouter = require("./api/projects/projects-router")
const actionsRouter = require("./api/actions/actions-router")

const server = express();

server.use(express.json())
server.use(cors())

server.use("/projects", projectRouter)
server.use("/actions", actionsRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Error"
    })
  })
  
server.get('/', (req, res) => {
    res.send(`<h2>Welcome to our projects API</h2>`);
  });
  

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
