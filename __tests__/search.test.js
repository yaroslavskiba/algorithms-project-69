import { test, expect } from '@jest/globals';
import buildSearchEngine from '../index.js';

describe('search', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  beforeEach(async () => {
    searchEngine = buildSearchEngine(docs);
  });

  test('search engine remembered documents', () => {
    // eslint-disable-next-line jest/valid-expect
    expect(searchEngine.docs.length > 0);
  });

  test('search by documents', () => {
    expect(searchEngine.search('shoot')).toMatchObject([doc2, doc1]);
  });

  test('documents are empty', () => {
    expect(searchEngine.search('')).toMatchObject([]);
  });

  test('search regardless of punctuation marks', () => {
    expect(searchEngine.search('pint')).toMatchObject([doc1]);
    expect(searchEngine.search('pint!')).toMatchObject([doc1]);
  });

  test('search by multiple occurrences', () => {
    expect(searchEngine.search('shoot at me')).toMatchObject([doc2, doc1]);
  });
});
