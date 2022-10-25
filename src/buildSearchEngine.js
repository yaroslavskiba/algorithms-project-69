export default (docs) => ({
  docs,
  search: (str) => {
    if (!str) {
      return [];
    }
    const searchReg = str.split(' ').map((cur) => {
      const cleanToken = cur.replace(/\W/g, '');
      return new RegExp(`\\b${cleanToken}\\b`, 'gi');
    });
    const sortPrepare = docs.map((doc) => ({
      ...doc,
      score: searchReg.reduce((acc, word) => acc + (doc.text.match(word)?.length ?? 0), 0),
      count: searchReg.reduce((acc, word) => acc + (word.test(doc.text) ? 1 : 0), 0),
    }));
    return sortPrepare.filter((doc) => doc.score
      || doc.count).sort((left, right) => right.count - left.count
      || right.score - left.score);
  },
});
