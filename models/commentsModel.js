const connection = require('../db/connection')

exports.updateCommentVotes = (comment_id, inc_votes) => {
    return connection
    .into("comments")
    .where("comment_id", comment_id)
    .increment({'votes': inc_votes})
    .returning('*')
    .then(comment => {
      if (comment.length === 0) return Promise.reject({ code: 404})
      else return comment
    })
}