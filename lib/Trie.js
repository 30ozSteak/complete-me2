import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    // this.root = {'children': {}};
    this.count = 0;
  }

  insert(word) {
    let letters = [...word];
    let currentNode = this.root;

    for (let i = 0; i < letters.length; i++) {
      let currentLetter = letters[i];
      let node = new Node();

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
  }

  countUp() {
    return this.count++;
  }

  populate(dictionary) {
    dictionary.forEach((word) => {
      this.insert([...word]);
    });
  }
}