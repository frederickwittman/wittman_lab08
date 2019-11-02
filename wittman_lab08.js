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
    console.log(current)
    currentDist = getDist(current, distList);
    edges = graph.AdjList.get(current);
    console.log(edges[1])
    
    for (var j = 0; j < edges.length; j++) {
      temp = getDistIndex(edges[j][0], distList);
      if (getDist(edges[j][0], distList) > currentDist + edges[j][1]) {
        distList[temp][1] = currentDist + edges[j][1];
      }
      else {

        distList[temp][1] = getDist(edges[j][0], distList);
      }
    }
    temp = getDistIndex(current, unprocessedList);
    unprocessedList.splice(temp, 1);
    console.log(unprocessedList.length);
  }
  console.log(distList[0]);

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

Dijkstra (g1, 'A');
