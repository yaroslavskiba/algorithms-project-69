import _ from 'lodash';

const wordRegexp = /[\w'-]+/gi;
const cleanToken = (word) => {
  const matches = word.match(wordRegexp);
  return matches[0].toLowerCase();
};

const getWords = (txt) => txt.split(' ').map((item) => cleanToken(item))
  .filter((cur) => cur);
const counter = (arr, word) => arr.reduce((acc, item) => (item === word ? acc + 1 : acc), 0);

const getDocsTokens = (docs) => docs.map(({ id, text }) => ({ id, tokens: getWords(text) }));
const getTokensArr = (docsTokens) => {
  const allTokens = _.uniq(docsTokens.reduce((acc, { tokens }) => acc.concat(tokens), []));
  return allTokens;
};

const getInvertIndex = (tokensArr, docsTokens) => {
  const index = tokensArr.reduce((acc, token) => {
    const docsList = docsTokens.reduce((accInner, { id, tokens }) => {
      if (tokens.includes(token)) {
        return [...accInner, id];
      }
      return accInner;
    }, []);
    return { ...acc, [token]: docsList };
  }, {});
  return index;
};

const getIdf = (invertIndex, sizeDocs) => {
  const idTokensArr = Object.entries(invertIndex);
  const idf = idTokensArr.reduce((acc, [key, value]) => {
    const numIdf = Math.log(1 + sizeDocs / value.length);
    return { ...acc, [key]: numIdf };
  }, {});
  return idf;
};
const getTf = (invertIndex, docsTokens) => {
  const idTokensArr = Object.entries(invertIndex);
  const index = idTokensArr.reduce((cur, [token, value]) => {
    const tf = value.reduce((acc, idDoc) => {
      const { tokens } = docsTokens.find((item) => item.id === idDoc);
      const count = counter(tokens, token);
      const numTf = count / tokens.length;
      return { ...acc, [idDoc]: numTf };
    }, {});
    return { ...cur, [token]: tf };
  }, {});
  return index;
};

const getIndex = (tf, idf) => { };


const buildSearchEngine = (docs) => {
  const docsTokens = getDocsTokens(docs);// делим текст на слова(токены) +
  const tokensArr = getTokensArr(docsTokens);// получаем уникальные значения всех токенов
  // из всех документов +
  const sizeDocs = docs.length;// количество документов +
  const invertIndex = getInvertIndex(tokensArr, docsTokens);// в каких документах встречается токен
  const idf = getIdf(invertIndex, sizeDocs);// вычисление idf для каждого слова во всех документах
  const tf = getTf(invertIndex, docsTokens);// вычисление tf для каждого слова в
  // каждом документе где оно имеется
  const index = getIndex(tf, idf);// подсчет индекса tf-idf

  return {
    index,
    search(str) {
      return ;
    },

  };
};

export default buildSearchEngine;
