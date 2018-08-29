import { expect } from 'chai';
import Trie from '../lib/Trie.js';

describe('Trie', () => {
  let trie;
  let node;

  beforeEach(() => {
    trie = new Trie();
  });

  it ('should exist', () => {
    expect(trie).to.exist;
  });

  it ('should have a root', () => {
    expect(trie.root).to.exist;
  });

  it ('should load with zero words', () => {
    expect(trie.count).to.equal(0);
  });

});