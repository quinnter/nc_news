const connection = require("../db/connection");

exports.selectArticles = ({ sort_by, order, author, topic, limit = 10, p = 1 }) => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.topic",
      "articles.author",
      "articles.created_at",
      "articles.votes",
      "articles.body"
    )
    .count("comments.article_id as comment_count")
    .from("articles")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
      if (order !== "asc" || order !== "desc") order = "desc";
    })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .limit(limit)
    .offset((p - 1) * limit)
    .returning("*");
};

exports.selectArticleById = article_id => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.topic",
      "articles.author",
      "articles.created_at",
      "articles.votes",
      "articles.body"
    )
    .count("comments.article_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .first()
    .then(article => {
      if (!article) return Promise.reject({ code: 404 });
      return article;
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  if (typeof inc_votes !== "number") inc_votes = 0
  return connection
    .into("articles")
    .where("article_id", article_id)
    .increment({ 'votes': inc_votes })
    .returning("*")
    .then(([article]) => {
      if (!article) return Promise.reject({ code: 404 });
      return article;
    });
};

exports.selectArticleComments = (article_id, sort_by, order, limit = 10, p = 1) => {
  return connection
    .select(
      "comments.comment_id",
      "comments.votes",
      "comments.created_at",
      "comments.author",
      "comments.body"
    )
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .limit(limit)
    .offset((p - 1) * limit)
    .then(articleComments => {
      return articleComments;
    });
};

exports.insertArticleComment = newCommentKeys => {
  return connection
    .into("comments")
    .insert(newCommentKeys)
    .returning("*");
};

exports.insertArticle = newArticleKeys => {
  return connection
    .into("articles")
    .insert(newArticleKeys)
    .returning("*")
    .then(article => {
      return article
    })
}

exports.removeArticleById = article_id => {
  return connection
  .from("articles")
  .where("article_id", article_id)
  .del();
}