const { Router } = require("express");
const commentController = require("../controllers/comments.controller");

const CommentRoute = Router();

CommentRoute.post("/create_comment", commentController.createComment);

CommentRoute.post("/delete_comment", commentController.deleteComment);

CommentRoute.options("*", function(req, res, next){
    next();
});

module.exports = CommentRoute;