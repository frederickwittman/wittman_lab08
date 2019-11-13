class Graph {
 constructor (numberOfVertices) {
   this.numberOfVertices = numberOfVertices;
   this.AdjList = new Map();
   this.vertList = [];
   this.edgeList = [];
 }
  addVertex(v) {
   this.AdjList.set(v, []);
   this.vertList.push(v);
 }
 addEdge(v, w, weight) {
   this.AdjList.get(v).push([w, weight]);
   this.AdjList.get(w).push([v, weight]);
   this.edgeList.push([v, w, weight]);
   this.edgeList.push([w, v, weight]);
 }
}

// We assume the graph is directed.  The code could be easily modified to accomodate a graph
// where all edges are bi-directional

function allPairsShortestPaths (g) {

  var matrix = [];

  // Create matrix of 0s 
  for (var i = 0; i < g.numberOfVertices; i++) {
    a = [];
    for (var j = 0; j < g.numberOfVertices; j++) {
      a[j] = Infinity;
    }
    matrix.push(a);
  }

  // Initialize [v][v] to 0
  for (var j = 0; j < g.numberOfVertices; j++) {
    matrix[j][j] = 0;
  }

  // Initialize [u][v] to weight(u, v)
  for (var k = 0; k < g.edgeList.length; k++) {
    u = g.vertList.indexOf(g.edgeList[k][0]);
    v = g.vertList.indexOf(g.edgeList[k][1]);
    weight = g.edgeList[k][2];

    matrix[u][v] = weight;
  }

  // Floyd-Warshall algorithm
  for (var k = 0; k < g.numberOfVertices; k++) {
    for (var i = 0; i < g.numberOfVertices; i++) {
      for (var j = 0; j < g.numberOfVertices; j++) {
        if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
           matrix[i][j] = matrix[i][k] + matrix[k][j]
        }
      }
    }
  }

  for (var i = 0; i < matrix.length; i++) {
      console.log(matrix[i]);
  }
}

g1 = new Graph (5);
vertices = ['A', 'B', 'C', 'D', 'E'];
for (var i = 0; i < vertices.length; i++) {
  g1.addVertex(vertices[i]);
}

g1.addEdge('A', 'B', 5);
g1.addEdge('B', 'C', 6);
g1.addEdge('A', 'C', 10);
g1.addEdge('A', 'E', 5);
g1.addEdge('A', 'D', 1);
g1.addEdge('D', 'E', 2);

console.log("Graph 1 Tests")


allPairsShortestPaths (g1);

// Test 2

g2 = new Graph (5);
vertices = ['A', 'B', 'C', 'D', 'E'];
for (var i = 0; i < vertices.length; i++) {
  g2.addVertex(vertices[i]);
}

g2.addEdge('A', 'B', 5);
g2.addEdge('B', 'C', 6);
g2.addEdge('C', 'D', 10);
g2.addEdge('D', 'E', 5);
g2.addEdge('A', 'E', 1);

console.log("Graph 2 Tests")
allPairsShortestPaths (g2);
