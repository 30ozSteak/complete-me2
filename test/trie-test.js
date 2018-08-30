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

    it ('should have an insert method', () => {
      expect(trie).respondsTo('insert');
    });

    it ('should insert a new node into the trie', () => {
      let data = 'warby';
  
      trie.insert(data);
  
      expect(Object.keys(trie.root.children)[0]).to.equal('w');
    });

    it ('should not create duplicate nodes when a word is already in the trie', () => {
      let data1 = 'parker';
      let data2 = 'parker';

      trie.insert(data1);
      trie.insert(data2);
      // console.log(JSON.stringify(trie, null, 4));
      expect(trie.count).to.equal(1);
    });

    it ('should not insert a child if that letter already exists in the trie', () => {
      let data1 = 'salt';
      let data2 = 'salty'; 

      trie.insert(data1);
      trie.insert(data2);

      let uniqueLetters = Object.keys(trie.root.children).filter(key => {
        return key === 's';
      });

      expect('s' in trie.root.children).to.equal(true);
      expect('a' in trie.root.children['s'].children).to.equal(true);
      expect(uniqueLetters.length).to.equal(1);
    });

    it ('should increase the word count by one if a new word is put into the trie', () => {
      trie.insert('hipster');
      expect(trie.count).to.equal(1);
    });

    it ('should not increase word by one count if the word is already in the trie', () => {
      trie.insert('hipster trash');
      trie.insert('hipster trash');
      expect(trie.count).to.equal(1);
    });
    
  });

  describe('suggest', () => {

    it ('should have a suggest method' , () => {
      expect(trie).respondsTo('suggest');
    });

    it ('should return an empty array if no words match the typed prefix', () => {
      let data1 = 'call';
      let data2 = 'call me';
      let data3 = 'call me maybe';
      let data4 = 'call me maybe is still relevant right';

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

  describe('populate', () => {

    it ('should exist', () => {
      expect(trie).respondsTo('populate');
    });

    it ('should increase the count when invoking populate', () =>{
      trie.populate(dictionary);
      expect(trie.count).to.equal(235886);
    });
  });
});
