export default (docs) => ({
  docs,
  search: (str) => {
    const empty = str.replace(/\W+/);
    const newReg = new RegExp('\\b' + empty + '\\b', 'i');
    return docs.filter(cur => docs[text].match(newReg));
  },
});
