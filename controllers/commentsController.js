const { updateCommentVotes } = require("../models/commentsModel")

exports.patchCommentById = (req, res, next) => {
    updateCommentVotes()
}