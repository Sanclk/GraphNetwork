// Sanduni CHamika
// 2017541
// w16737755
// Copyrights : https://github.com/prabod/Graph-Theory-Ford-Fulkerson-Maximum-Flow

function bfs(rGraph, s, t, parent) {
    var visited = [];
    var queue = [];
    var V = rGraph.length;
    // Create a visited array and mark all vertices as not visited
    for (var i = 0; i < V; i++) {
        visited[i] = false;
    }
    // Create a queue, enqueue source vertex and mark source vertex as visited
    queue.push(s);
    visited[s] = true;
    parent[s] = -1;

    while (queue.length != 0) {
        var u = queue.shift();
        for (var v = 0; v < V; v++) {
            if (visited[v] == false && rGraph[u][v] > 0) {
                queue.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }
    //If we reached sink in BFS starting from source, then return true, else false
    return (visited[t] == true);
}

function fordFulkerson(graph, s, t) {
    if (s < 0 || t < 0 || s > graph.length-1 || t > graph.length-1){
        throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid sink or source");
    }
    if(graph.length === 0){
        throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph");
    }
    var rGraph = [];
    for (var u = 0; u < graph.length; u++) {
        var temp = [];
        if(graph[u].length !== graph.length){
            throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph. graph needs to be NxN");
        }
        for (v = 0; v < graph.length; v++) {
            temp.push(graph[u][v]);
        }
        rGraph.push(temp);
    }
    var parent = [];
    var maxFlow = 0;
    let i = 0;
    while (bfs(rGraph, s, t, parent)) {
        var arr =[];
        var pathFlow = Number.MAX_VALUE;
        for (var v = t; v != s; v = parent[v]) {
            u = parent[v];
            pathFlow = Math.min(pathFlow, rGraph[u][v]);
            arr[i] = [(v+1),(u+1)];
            i++;
        }

        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= pathFlow;
            rGraph[v][u] += pathFlow;
        }

        console.log("PATH FLOW    |"+ arr + "|   " +pathFlow);
        maxFlow += pathFlow;
    }
    // Return the overall flow
    return maxFlow;
}