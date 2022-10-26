import _ from 'lodash';

const wordRegexp = /\w+/g;
const cleanToken = (word) => {
  const matches = word.match(wordRegexp);
  if (matches) {
    return matches[0].toLowerCase();
  }
  return '';
};

const getTokens = (text) => text.split(' ').map((item) => cleanToken(item)).filter((item) => item);
const getDocsTokens = (docs) => docs.map(({ id, text }) => ({ id, tokens: getTokens(text) }));
const counter = (arr, term) => arr.reduce((acc, item) => (item === term ? acc + 1 : acc), 0);

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
  const entries = Object.entries(invertIndex);
  const idf = entries.reduce((acc, [key, value]) => {
    const numIdf = _.round(Math.log(1 + sizeDocs / value.length), 3);
    return { ...acc, [key]: numIdf };
  }, {});
  return idf;
};
const getTf = (invertIndex, docsTokens) => {
  const entries = Object.entries(invertIndex);
  const index = entries.reduce((cur, [token, value]) => {
    const tf = value.reduce((acc, idDoc) => {
      const { tokens } = docsTokens.find((item) => item.id === idDoc);
      const count = counter(tokens, token);
      const numTf = _.round(count / tokens.length, 3);
      return { ...acc, [idDoc]: numTf };
    }, {});
    return { ...cur, [token]: tf };
  }, {});
  return index;
};

const getIndex = (tf, idf) => {
  const entries = Object.entries(tf);
  const index = entries.reduce((cur, [token, tfObj]) => {
    const tfEntries = Object.entries(tfObj);
    const tfIdf = tfEntries.reduce((acc, [idDoc, tfValue]) => {
      const tfIdfValue = _.round(tfValue * idf[token], 3);
      return { ...acc, [idDoc]: tfIdfValue };
    }, {});
    return { ...cur, [token]: tfIdf };
  }, {});
  return index;
};

const getWordTfIdf = (strIndex) => {
  const values = Object.values(strIndex);
  const docsRels = values.reduce((acc, obj) => {
    const entries = Object.entries(obj);
    const newAcc = entries.reduce((acc2, [docId, coef]) => {
      const prev = acc2[docId] ?? 0;
      const current = _.round(prev + coef, 3);
      return { ...acc2, [docId]: current };
    }, acc);
    return newAcc;
  }, {});
  return docsRels;
};

const getsortList = (wordTfIdf) => {
  const entries = Object.entries(wordTfIdf);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  const sortedList = sortedEntries.map(([docId]) => docId);
  return sortedList;
};

const buildSearchEngine = (docs) => {
  console.log(docs);
  const docsTokens = getDocsTokens(docs);
  const tokensArr = getTokensArr(docsTokens);
  const sizeDocs = docs.length;
  const invertIndex = getInvertIndex(tokensArr, docsTokens);
  const idf = getIdf(invertIndex, sizeDocs);
  const tf = getTf(invertIndex, docsTokens);
  const index = getIndex(tf, idf);

  return {
    index,
    search(str) {
      const strTokens = getTokens(str);
      const strIndex = _.pick(this.index, strTokens);
      const wordTfIdf = getWordTfIdf(strIndex);
      const sortList = getsortList(wordTfIdf);
      return sortList;
    },
  };
};
export default buildSearchEngine;
