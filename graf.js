class Graph {
  constructor() {
    this.nodes = [];
  }
  addNode(n) {
    let id = Math.random();
    n.id = id;
    n.graph = this;
    this.nodes[id] = n
    return id;
  }
}

class Node {
  constructor() {
    this.id = null;
    this.graph = null;
    this.connections = [];
  }
  connect(connection, other){
    connection.target = other;
    this.connections.push(connection);
  }
}

class Connection {
  constructor() {
    this.target = null;
  }
}
