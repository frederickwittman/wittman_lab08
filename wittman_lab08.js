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
    if (distList[i][1] > minDist) {
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
  distList = [];
  for (var i = 0; i < graph.numberOfVertices; i++) {
    if (graph.vertList[i] == source) {
      distList.push([source, 0]);
    }
    else {
      distList.push([vertList[i], Infinity]);
    }
  }

  unprocessedList = distList;

  while (unprocessedList.length > 0) {
    current = getMinOfDistList(unprocessedList);
    currentDist = getDist(current, distList);
    edges = graph.AdjList.get(current);

    for (var j = 0; j < edges.length; j++) {
      temp = getDistIndex(edges[j][0], distList);
      if (getDist(edges[j][0], distList) > currentDist + edges[j][1]) {
        distList[temp][1] = currentDist + edges[j][1];
      }
      else {
        distList[temp][1] = getDist(edges[j][0], distList);
      }
    }
    temp = getDistIndex(current, unproccessedList);
    unprocessedList.splice(temp, 1);
  }

}
