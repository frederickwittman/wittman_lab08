// Fred Wittman
// Lars Kotthoff
// Rajiv Khadka
// COSC 3020
// Lab 07
// 11/01/19

class Graph {
 constructor (numberOfVertices) {
   this.numberOfVertices = numberOfVertices;
   this.AdjList = new Map();
   this.vertList = [];
 }
  addVertex(v) {
   this.AdjList.set(v, []);
   this.vertList.push(v);
 }
 addEdge(v, w, weight) {
   this.AdjList.get(v).push([w, weight]);
   this.AdjList.get(w).push([v, weight]);
 }

 getEdgeWeight (v, w) {
   edges = this.AdjList.get(v);
   for (var i = 0; i < edges.length; i++) {
     if (edges[i][0] == w) {
       return edges[i][1];
     }
   }
   return undefined;
 }
}

function getMinOfDistList (distList) {
  minVertex = distList[0][0];
  minDist = distList[0][1];
  for (var i = 0; i < distList.length; i++) {
    if (distList[i][1] < minDist) {
      minDist = distList[i][1];
      minVertex = distList[i][0];
    }
  }
  return minVertex;
}

function getDist (vert, distList) {
  for (var i = 0; i < distList.length; i++) {
    if (distList[i][0] == vert) {
      return distList[i][1];
    }
  }
}

function getDistIndex (vert, distList) {
  for (var i = 0; i < distList.length; i++) {
    if (distList[i][0] == vert) {
      return i;
    }
  }
}

function Dijkstra (graph, source) {
  var distList = [];
  var unprocessedList = [];
  for (var i = 0; i < graph.numberOfVertices; i++) {
    if (graph.vertList[i] == source) {
      distList.push([source, 0]);
      unprocessedList.push([source, 0]);
    }
    else {
      distList.push([graph.vertList[i], Infinity]);
      unprocessedList.push([graph.vertList[i], Infinity]);
    }
  }

  while (unprocessedList.length > 0) {
    current = getMinOfDistList(unprocessedList);
    currentDist = getDist(current, distList);
    edges = graph.AdjList.get(current);
    
    for (var j = 0; j < edges.length; j++) {
      distWIndex = getDistIndex(edges[j][0], distList);
      distWIndex1 = getDistIndex(edges[j][0], unprocessedList);

      if (getDist(edges[j][0], distList) > currentDist + edges[j][1]) {
        distList[distWIndex][1] = currentDist + edges[j][1];
        if (distWIndex1 != undefined) {
          unprocessedList[distWIndex1][1] = currentDist + edges[j][1];
        }
      }
      else {
        distList[distWIndex][1] = getDist(edges[j][0], distList);
        if (distWIndex1 != undefined) {
          unprocessedList[distWIndex1][1] = currentDist + edges[j][1];
        }
      }
    }
    temp = getDistIndex(current, unprocessedList);
    unprocessedList.splice(temp, 1);
  }
  for (var k = 0; k < distList.length; k++) {
    console.log(distList[k]);
  }
}

// Test 1

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

console.log("Source: A")
Dijkstra (g1, 'A');

console.log("Source: B")
Dijkstra (g1, 'B');

console.log("Source: C")
Dijkstra (g1, 'C');

console.log("Source: D")
Dijkstra (g1, 'D');

console.log("Source: E")
Dijkstra (g1, 'E');

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

console.log("Source: A")
Dijkstra (g2, 'A');

console.log("Source: B")
Dijkstra (g2, 'B');

console.log("Source: C")
Dijkstra (g2, 'C');

console.log("Source: D")
Dijkstra (g2, 'D');

console.log("Source: E")
Dijkstra (g2, 'E');
