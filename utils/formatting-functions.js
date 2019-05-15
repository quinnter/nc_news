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
  return newObj;
};

const commentsWithArticleId = (articleData, refObj) => {
  const formattedArticle = articleData.map(({ article_id, ...articleKeys }) => {
    return { article_id: refObj[article_id], ...articleKeys };
  });
  return formattedArticle;
};

const formatDate = input => {
  const inputWithTime = input.map(item => {
    const timestamp = item.created_at;
    const newInputObj = item;
    newInputObj.created_at = new Date(timestamp);
    return newInputObj;
  });
  return inputWithTime;
};

module.exports = { createRef, commentsWithArticleId, formatDate, renameKeys };
