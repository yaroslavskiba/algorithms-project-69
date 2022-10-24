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

// const empty = str.replace(/\W/g, '');
// const searchReg = new RegExp(`\\b${empty}\\b`, 'i');
// return docs.filter((cur) => cur.text.match(searchReg));
