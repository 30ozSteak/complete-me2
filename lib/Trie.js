import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(word) {
    let letters = [...word];
    let currentNode = this.root;
    
    for (let i = 0; i < letters.length; i++) {
      let currentLetter = letters[i];

      if (!currentNode.children[currentLetter]) {
        currentNode.children[currentLetter] = new Node(currentLetter);
      }
      currentNode = currentNode.children[currentLetter];
    }
    if (!currentNode.endOfTheWord) {
      currentNode.endOfTheWord = word;
      this.countUp();
    }
  }

  suggest(prefix) {
    let suggestedWords = [];
    let currentNode = this.root;
    let letters = [...prefix];

    for (let i = 0; i < letters.length; i++) {
      currentNode = currentNode.children[letters[i]];
      if (!currentNode) {
        return [];
      }
    }
    this.getSuggestions(currentNode, suggestedWords);
    return suggestedWords;
  }

  getSuggestions(currentNode, node) {
    if (currentNode.endOfTheWord) {
      node.push(currentNode.endOfTheWord);
    }

    Object.values(currentNode.children).forEach(letter => {
      this.getSuggestions(letter, node);
    });
  }

  countUp() {
    return this.count++;
  }

  populate(dictionary) {
    dictionary.forEach((word) => {
      this.insert([...word]);
    });
  }

  delete(word) {
    let node = this.root;

    while (word.length) {
      node = node.children[word[0]];
      word = word.substr(1);
    }
    if (node.endOfTheWord) {
      node.endOfTheWord = false;
      this.count--;
    }
  }
}