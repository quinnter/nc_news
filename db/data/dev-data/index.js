const topicsData = require("./topics")
const usersData = require("./users")
const articlesData = require("./articles")
const commentsData = require("./comments")
const endPointsData = require("./endpoints")

const devData = {
    topicsData: topicsData,
    usersData: usersData,
    articlesData: articlesData,
    commentsData: commentsData,
    endPointsData: endPointsData
}

module.exports = { devData }
