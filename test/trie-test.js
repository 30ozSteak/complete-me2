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

    it ('should not create duplicate nodes when a word is already in the trie', () => {
      let data1 = 'parker';
      let data2 = 'parker';

      trie.insert(data1);
      trie.insert(data2);
      // console.log(JSON.stringify(trie, null, 4));
      expect(trie.count).to.equal(1);
    });

    it ('should return an empty array if no words match the typed prefix', () => {
      let data1 = 'call';
      let data2 = 'callme';
      let data3 = 'callmemaybe';
      let data4 = 'callmemaybeisstillrelevantright';

      trie.insert(data1);
      trie.insert(data2);
      trie.insert(data3);
      trie.insert(data4);
      expect(trie.suggest('cx')).to.deep.equal([]);
    });

    it ('should return a full array full of words that match the typed prefix', () => {
      let data1 = 'warby';
      let data2 = 'warby parker';
      let data3 = 'warby parker glasses are great';

      trie.insert(data1);
      trie.insert(data2);
      trie.insert(data3);
      // console.log(JSON.stringify(trie, null, 4));
      expect(trie.suggest('w')).to.deep.equal(['warby', 'warby parker', 'warby parker glasses are great']);
      expect(trie.suggest('warby parker')).to.deep.equal(['warby parker', 'warby parker glasses are great']);
    });

    it ('should not return words that do not match the typed prefix', () => {
      let data1 = 'warby';
      let data2 = 'warby parker glasses are great';

      trie.insert(data1);
      trie.insert(data2);
      // console.log(JSON.stringify(trie, null, 4));

      expect(trie.suggest('warby parker')).to.not.equal(['warby parker glasses suck']);
    });
  });

});
