const createRef = (input, key, value) => {
    const refObj = {};
    input.forEach(item => {
      refObj[item[key]] = item[value];
    });
    return refObj;
};
const createArticleUsername = (articleData, refObj) => {
  const formattedArticle = articleData.map(({author,...articleKeys}) => {
     return {author: refObj[username], ...articleKeys}
   });
  return formattedArticle
};

const createArticleTopic = (articleData, refObj) => {
  const formattedArticle = articleData.map(({topic,...articleKeys}) => {
     return {topic: refObj[topic], ...articleKeys}
   });
  return formattedArticle
};

const formatDate = (input) => {
  const articleWithTime = input.map(article => {
    const timestamp = article.created_at;
    const newArticleObj = article
    newArticleObj.created_at = new Date(timestamp).toUTCString();
    console.log(newArticleObj)
  })
  return articleWithTime
}


module.exports = { createRef, createArticleUsername, createArticleTopic, formatDate }