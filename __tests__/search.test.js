import { test, expect } from '@jest/globals';
import buildSearchEngine from '../index.js';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];

const searchEngine = buildSearchEngine(docs);

test('search engine remembered documents', () => {
  expect(searchEngine.docs).toHaveLength(3);
});

test('search by documents', () => {
  expect(searchEngine.search('shoot')).toStrictEqual([doc1, doc2]);
});

test('documents are empty', () => {
  expect(searchEngine.search('')).toStrictEqual([]);
});
