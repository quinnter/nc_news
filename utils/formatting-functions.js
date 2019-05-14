const createRef = (input, key, value) => {
    const refObj = {};
    input.forEach(item => {
      refObj[item[key]] = item[value];
    });
    return refObj;
};

const renameKeys = (input, keyToChange, newKey) => {
  const newObj = input.map(item => {
    const { [keyToChange]: value, ...restOfInput } = item;
    return { [newKey]: value, ...restOfInput };
  });
  console.log(newObj);
  return newObj;
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
  const inputWithTime = input.map(item => {
    const timestamp = item.created_at;
    const newInputObj = item
    newInputObj.created_at = new Date(timestamp).toUTCString();
    return newInputObj
  })
  return inputWithTime
}


module.exports = { createRef, createArticleUsername, createArticleTopic, formatDate, renameKeys }