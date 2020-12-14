// Write your "actions" router here!
const express = require("express")
const actionsModel = require("./actions-model")

const router = express.Router()

router.post("/", (req, res) => {
    if (!req.body.description || !req.body.notes) {
      return res.status(400).json({
        message: "Please provide notes and description for the action.",
      });
    }
    actionsModel.insert(req.body)
      .then((action) => {
        res.status(201).json(action)
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Error while saving",
        })
      })
  })

  router.get("/", (req, res) => {
    actionsModel.get()
    .then((actions) => res.status(200).json(actions))
    .catch((err) => next(err))
  })
  
  router.get("/:id", (req, res, next) => {
    actionsModel.get(req.params.id)
      .then((action) => {
        if (action) {
          res.status(200).json(action)
        } else {
          res.status(404).json({
            message: "Action not found",
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  })
  
  router.delete("/:id", (req, res) => {
    actionsModel.remove(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({
          message: "Cannot remove action",
        })
      }
    })
  })
  
  router.put("/:id", (req, res) => {
    if (!req.body.description || !req.body.notes) {
      return res.status(400).json({
        message: "Please provide notes and description for action",
      });
    }
    actionsModel.update(req.params.id, req.body)
      .then((action) => {
        if (action) {
          res.status(200).json(action)
        } else {
          res.status(404).json({
            message: "This specific action does not exist",
          });
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Action cannot be chagned",
        })
      })
  })

module.exports = router