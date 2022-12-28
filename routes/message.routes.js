const { Router } = require("express");
const messageController = require("../controllers/messages.controller");

const MessageRoute = Router();

MessageRoute.post("/create_message", messageController.createMessage);

MessageRoute.post("/delete_message", messageController.deleteMessage);

MessageRoute.options("*", function(req, res, next){
    next();
});

module.exports = MessageRoute;