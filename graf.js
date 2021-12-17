class Graph {
  constructor() {
    this.nodes = {};
    this.colors = {};
  }
  addNode(n) {
    this.nodes[n.id] = n;
    return n;
  }
  addConnection(n1, n2) {
    this.nodes[n1].neighbors.push(n2);
    this.nodes[n2].neighbors.push(n1);
  }
  color() {
    this.colors = {};
    let c = 0;
    for(const i in this.nodes) {
      if (!(i in this.colors)){
        this.colors[i] = c;
      }
      for(const j in this.nodes) {
        if (i!=j) {
          if (!(j in this.colors)){
            let yes = true;
            for (const k of this.nodes[j].neighbors) {
              if(k in this.colors){
                if (this.colors[k] == c) {
                  yes = false;
                }
              }
            }
            if(yes) {
              this.colors[j] = c;
            }
          }
        }
      }
      c++;
    }
  }
}

class Node {
  constructor() {
    this.id = Math.random();
    this.neighbors = [];
  }
}
