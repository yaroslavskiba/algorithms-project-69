import _ from 'lodash';

const wordRegexp = /[\w'-]+/gi;
const cleanToken = (word) => {
  const clear = word.match(wordRegexp);
  return new RegExp(`\\b${clear}\\b`, 'gi');
};

const getWords = (txt) => txt.split(' ').map((item) => cleanToken(item))
  .filter((cur) => cur); // строка поиска

const getDocsTokens = (docs) => docs.map(({ id, text }) => ({ id, tokens: getWords(text) }));
const getTokensArr = (docsTokens) => {
  const allTokens = _.uniq(docsTokens.reduce((acc, { tokens }) => acc.concat(tokens), []));
  return allTokens;
};
const getInvertIndex = (tokensArr, docsTokens) => { };
const getIdf = (invertIndex, sizeDocs) => { };
const getTf = (invertIndex, docsTokens) => { };
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
      if (!str) {
        return [];
      }

      return ;
    },

  };
};

export default buildSearchEngine;
