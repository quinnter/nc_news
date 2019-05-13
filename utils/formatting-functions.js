const createRef = (input, key, value) => {
    const refObj = {};
    input.forEach(item => {
      refObj[item[key]] = item[value];
    });
    console.log(refObj);
    return refObj;
};
const createArticleUsername = (articleData, refObj) => {
  const formattedArticle = articleData.map(({author,...articleKeys}) => {
     return {author: refObj[username], ...articleKeys}
   });
  return formattedArticle
};

const createArticleUsername = (articleData, refObj) => {
  const formattedArticle = articleData.map(({topic,...articleKeys}) => {
     return {topic: refObj[topic], ...articleKeys}
   });
  return formattedArticle
};


module.exports = { createRef, createArticleUsername }