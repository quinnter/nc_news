const { updateCommentVotes, removeCommentById } = require("../models/commentsModel")

exports.patchCommentById = (req, res, next) => {
   const { comment_id } = req.params
   const { inc_votes } = req.body
    updateCommentVotes(comment_id, inc_votes)
    .then(comment => {
        res.status(201).send({ comment })
    })
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params
    removeCommentById(comment_id)
    .then(result => {
      console.log(result)
        res.sendStatus(204)
    })
    .catch(err => {
        console.log(err)
    })
}