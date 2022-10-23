export default (docs) => ({
  docs,
  search: (str) => docs.filter((doc) => doc.text.split(' ').includes(str)),
});
