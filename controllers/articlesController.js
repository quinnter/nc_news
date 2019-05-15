const { selectArticles } = require("../models/articlesModel")

exports.getArticles = (req, res, next) => {
console.log("in the topic controller")
  selectArticles(req.query)
  .then(articles => {
      res.status(200).send({ articles })
  })
  .catch(next)
}