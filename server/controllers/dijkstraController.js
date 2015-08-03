/**
 * @author Rodrigo Savage
 * Description:
 */

// var PriorityQueue = require('priorityqueuejs');

// Vertices are integer indices
var dijkstra = function (vertices, edges, source) {
    dist = {};
    prev = {};
    q = [];

    // console.log('dijkstra',vertices,edges);
    // q == new PriorityQueue(function(v1, v2) {
    //  		return dist[v2] - dist[v1];
    // });

    // console.log('Testing dijkstra');
    dist[source] = 0;
    prev[source] = undefined;
    N = buildNeighbourArray(edges);
    for (var v = vertices.length - 1; v >= 0; v--) {
        if (v != source) {
            dist[v] = Number.MAX_VALUE;
            prev[v] = undefined;
        }
        // q.enq(v);
        q.push(v);

    }
    while (q.length > 0) {
        // while(q.size()>0){
        // get the min distant vertex from the front
        // var u = q.deq();
        var u = minQ(q, dist);
        // console.log('la U :', u )
        remove(u, q);
        // get neighbours

        var neighbours = N[u];
        // console.log('Testing nei', neighbours);
        for (var i = neighbours.length - 1; i >= 0; i--) {
            var v = neighbours[i].v;
            var duv = neighbours[i].d;
            var alt = dist[u] + duv;
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
            }
        }
    }
    return {dist: dist, prev: prev}
};


var minQ = function (q, dist) {
    var minVal = Number.MAX_VALUE;
    var minVert = -1;
    for (var i = q.length - 1; i >= 0; i--) {
        var v = q[i];
        // console.log('la q: ', q[i])
        if (dist[v] < minVal) {
            minVert = v;
        }
        // console.log('Esta es la dist[]: ',dist[i])
    }
    return minVert;
};

var buildNeighbourArray = function (E) {
    // console.log('edges: ', E)
    N = [];
    for (var i = E.length - 1; i >= 0; i--) {
        var v1 = E[i].coordinateA;
        var v2 = E[i].coordinateB;
        var d = E[i].distance;
        if (N[v1] == undefined)N[v1] = [];
        if (N[v2] == undefined)N[v2] = [];
        N[v1].push({v: v2, d: d});
        N[v2].push({v: v1, d: d});
    }
    // console.log('ene', N)
    return N;
    /*
     =======
     var minQ = function (q, dist) {
     var minVal = Number.MAX_VALUE;
     var minVert = -1;
     for (var i = q.length - 1; i >= 0; i--) {
     var v = q[i];
     // console.log('la q: ', q[i])
     if (dist[v] < minVal) {
     minVert = v;
     }
     console.log('Esta es la dist[]: ', dist[i])
     }
     return minVert;
     };

     var buildNeighbourArray = function (E) {
     console.log('edges: ', E);
     N = [];
     for (var i = E.length - 1; i >= 0; i--) {
     var v1 = E[i].coordinateA;
     var v2 = E[i].coordinateB;
     var d = E[i].distance;
     if (N[v1] == undefined)N[v1] = [];
     if (N[v2] == undefined)N[v2] = [];
     N[v1].push({v: v2, d: d});
     N[v2].push({v: v1, d: d});
     }
     // console.log('ene', N)
     return N;
     >>>>>>> 5e60ebf526fef263f8473d95829f304850996ede
     */
};

var remove = function (u, q) {
    var index = q.indexOf(u);
    q.splice(index, 1);
};

module.exports = dijkstra;
