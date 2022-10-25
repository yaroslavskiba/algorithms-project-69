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
    const sortPrepare =  docs.map((doc) => ({
      ...doc,
      score: searchReg.reduce((acc, word) => acc + (doc.text.match(word)?.length ?? 0), 0),
      count: searchReg.reduce((acc, word) => acc + (word.test(doc.text) ? 1 : 0), 0),
    }));
    return sortPrepare.filter((doc) => doc.score || doc.count).sort((left, right) => right.count - left.count || right.score - left.score,
  );
  },
});

// const buildSearchEngine = (docs) => ({
//   docs,
//   search: (str) => {
//     if (!str) {
//       return [];
//     }
//     const searchReg = str.split(' ').map(cur => {
//       const cleanToken = cur.replace(/\W/g, '');
//       return new RegExp(`\\b${cleanToken}\\b`, 'gi');
//     });
//     const sortPrepare =  docs.map((doc) => ({
//       ...doc,
//       score: searchReg.reduce((acc, word) => acc + (doc.text.match(word)?.length ?? 0), 0),
//       count: searchReg.reduce((acc, word) => acc + (word.test(doc.text) ? 1 : 0), 0),
//     }));
//     return sortPrepare.filter((doc) => doc.score || doc.count).sort((left, right) => right.count - left.count || right.score - left.score,
//   );
//   },
// });

// const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
// const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
// const doc3 = { id: 'doc3', text: "I'm your shooter." };
// const docs = [doc1, doc2, doc3];

// const searchEngine = buildSearchEngine(docs);

// searchEngine.search('shoot me?'); // ['doc2', 'doc1']
