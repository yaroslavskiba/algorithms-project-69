// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

const cleanToken = (word) => {
  const clear = word.match(/\w+/g)[0];
  return new RegExp(`\\b${clear}\\b`, 'gi');
};

const getText = (txt) => txt.split(' ').map((item) => item.match(/\w+/g)[0]);

const getWords = (txt) => txt.split(' ').map((item) => cleanToken(item));

const getIndex = (docs) => docs
  .reduce((cur, doc) => {
    const { id, text } = doc;
    const words = getText(text);
    return words.reduce((acc, word) => {
      if (!acc[word]) {
        return { ...acc, [word]: { [id]: 1 } };
      }
      const current = acc[word][id] ?? 0;
      const count = current + 1;
      return { ...acc, [word]: { ...acc[word], [id]: count } };
    }, cur);
  }, {});

const buildSearchEngine = (docs) => ({
  docs,
  search(str) {
    if (!str) {
      return [];
    }
    const strWords = getWords(str);
    const counters = this.docs.map((doc) => {
      const { id, text } = doc;
      const counts = strWords
        .reduce((acc, word) => acc + (text.match(word)?.length ?? 0), 0);
      const score = strWords
        .reduce((acc, word) => acc + (word.test(text) ? 1 : 0), 0);
      return { id, counts, score };
    });
    const filteredCounters = counters.filter((count) => count.score
      || count.counts).sort((left, right) => right.counts - left.counts
      || right.score - left.score);
    const result = filteredCounters.map((doc) => doc.id);
    console.log(getIndex(docs));
    return result;
  },
});

export default buildSearchEngine;
