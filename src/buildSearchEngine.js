export default (docs) => ({
  docs,
  search: (str) => {
    if (!str) {
      return [];
    }
    const emptyToken = str.replace(/\W/g, '');
    const searchReg = new RegExp(`\\b${emptyToken}\\b`, 'gi');
    return docs.map((doc) => ({
      ...doc,
      score: doc.text.match(searchReg)?.length ?? 0,
    })).filter((doc) => doc.score).sort((left, right) => right.score - left.score);
  },
});
