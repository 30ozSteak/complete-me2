import { expect } from 'chai';
import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';
import fs from 'fs';
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

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

  describe('Insert', () => {
    it ('should insert a new node into the trie', () => {
      let data = 'warby';
  
      trie.insert(data);
  
      expect(Object.keys(trie.root.children)[0]).to.equal('w');
    });

    it ('should get words from the built-in dictionary and put them into the trie', () => {
      trie.populate(dictionary);
      expect(trie.count).to.deep.equal(235886);
    });
  });

});
