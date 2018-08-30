import { expect } from 'chai';
import Node from '../lib/Node';

describe ('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('n');
  });

  it('should exist', () =>{
    expect(node).to.exist;
  });

  it('should be defaulted to null', () => {
    expect(node.endOfTheWord).to.equal(null);
  });

  it('should have a child set to an empty object', () => {
    expect(node.children).to.deep.equal({});
  });

});