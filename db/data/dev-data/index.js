const topicsData = require("./topics")
const usersData = require("./users")
const articlesData = require("./articles")
const commentsData = require("./comments")

const devData = {
    topicsData: topicsData,
    usersData: usersData,
    articles: articlesData,
    commentsData: commentsData
}

module.exports = { devData }
