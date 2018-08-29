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

  it ('should start the trie with no words', () => {
    expect(trie.count).to.equal(0);
  });

  it ('should start with an empty object as its child', () => {
    expect(trie.root.children).to.deep.equal({});
  });

});