export default (docs) => ({
  docs,
  search: (str) => {
    if (!str) {
      return [];
    }
    const empty = str.replace(/\W/g, '');
    return docs.filter((cur) => new RegExp(`\\b${empty}\\b`, 'i').test(cur.text));
  },
});
