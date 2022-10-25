export default (docs) => ({
  docs,
  search: (str) => {
    if (!str) {
      return [];
    }
    const searchReg = str.split(' ').map(cur => {
      const cleanToken = cur.replace(/\W/g, '');
      return new RegExp(`\\b${cleanToken}\\b`, 'gi');
    });
    return docs.map((doc) => ({
      ...doc,
      score: searchReg.reduce((acc, word) => acc + (doc.text.match(word)?.length ?? 0), 0),
      count: searchReg.reduce((acc, word) => acc + (word.test(doc.text) ? 1 : 0), 0),
    })).filter((doc) => doc.score).sort((left, right) => right.score - left.score);
  },
});
