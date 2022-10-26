const getDocsTokens = (docs) => { };
const getTokensArr = (docsTokens) => { };
const getInvertIndex = (tokensArr, docsTokens) => { };
const getIdf = (invertIndex, sizeDocs) => { };
const getTf = (invertIndex, docsTokens) => { };
const getIndex = (tf, idf) => { };


const buildSearchEngine = (docs) => {
  const sizeDocs = docs.length;// количество документов
  const docsTokens = getDocsTokens(docs);// делим текст на слова(токены)
  const tokensArr = getTokensArr(docsTokens);// получаем уникальные значения всех токенов
  // из всех документов
  const invertIndex = getInvertIndex(tokensArr, docsTokens);// в каких документах встречается токен
  const idf = getIdf(invertIndex, sizeDocs);// вычисление idf для каждого слова во всех документах
  const tf = getTf(invertIndex, docsTokens);// вычисление tf для каждого слова в
  // каждом документе где оно имеется
  const index = getIndex(tf, idf);// подсчет индекса tf-idf
};

export default buildSearchEngine;
