/// Dependencies
var fs = require('fs');
var extend = require("extend");

/// Read file and create graph //////////////////////////////////////////*/
function getGraph(data) {
	debugger;
	var content,
		grapho = new Graph("main");

	//if parsed before
	//if (graph.length) return graph;

	//if not mocked data
	console.log(data);
	if (!data) {
		data = fs.readFileSync('./kargerMinCut.txt', 'utf8');	
		content = data.split("\r\n");
	} else {
		// content = data.slice();
		content = data.map(function(arr) {
		    return arr.slice();
		});
	}	

    for (var i = 0 ; i < content.length; i++) {
    	if (typeof content[i] == "string") {
    		var separator = content[i].indexOf('\t') == -1 ? " " : "\t";

    		content[i] = content[i].split(separator).map(function(a) { return parseInt(a, 10); });
    	}
    	//if not empty
    	if (content[i][0]) {
    		grapho.addVertex(new Vertex(content[i].shift(), content[i]));
    	}
    }

    grapho.updateEdges();
    debugger;
    return grapho;
}



/// Graph Class Definition
function Graph(id, vertexs, edges) {
	this.id = id || "graph";
	this.vertexs = vertexs || {};
	this.edges = edges || {};
	this.updateEdges();
}
Graph.prototype.addVertex = function(vertex) {
	this.vertexs[vertex.id] = vertex;
} 
Graph.prototype.updateEdges = function() {
	var item, a, b, i, j, edge;
	this.edges = {};

	for (i in this.vertexs) {
		item = this.vertexs[i];
		// console.log(item);
		a = item.id;
		for (j = 0; j < item.edges.length; j++) {
			b = item.edges[j];
			if (!b) continue;
			edge = a < b ? [a, b] : [b, a];
			this.edges[edge.toString()] = 1;
		} 
	}
}
Graph.prototype.clone = function(id) {
	return new Graph(id || this.id, extend({}, this.vertexs), extend({}, this.edges)); 
}
Graph.prototype.getRandomEdge = function(a, b) {
		// console.log(this.edges);
		var keys = Object.keys(this.edges);
		var num = Math.floor(Math.random() * keys.length);
		// console.log(num);
		return keys[num].split(',').map(function(a) { return parseInt(a, 10); });
}
Graph.prototype.countVertexs = function() {
	return Object.keys(this.vertexs).length;
}
Graph.prototype.mergeVertexs = function(edge) {
	debugger;
	// console.log(edge);
	var a = edge[0],
		b = edge[1],
		item = this.vertexs[a],
		itemb = this.vertexs[b],
		contains = this.vertexs[a].contains;
	
	item.mergeEdges(itemb.edges, b);
	
	//walks edges of the item to be removed
	for (var i = 0; i < itemb.edges.length; i++) {
		
		var aa = itemb.edges[i],
			key = aa < b ? [aa,b] : [b,aa],
			toSum = this.edges[key.toString()] || 1;  
		    //delete all edges pointing to the item to be removed
			delete this.edges[key.toString()];
			
			//if the vertex to update edeges is the one to be erased, do nothing
			if (aa != b) this.vertexs[aa].swapEdge(a, b);
		
		//if this edge doesnt point to a contained vertex in the same sueprnode, create it
		if (contains.indexOf(itemb.edges[i]) == -1 && a != aa) {
			key = aa < a ? [aa,a] : [a,aa];
			if (this.edges[key.toString()]) {
				this.edges[key.toString()] += toSum;
			} else {
				this.edges[key.toString()] = toSum;
			}
		} 
	}
	
	//delete the selected edge. Is this necesary?
	delete this.edges[edge.toString()];
	
	//concat contains of supernode
	this.vertexs[a].contains = this.vertexs[a].contains.concat(this.vertexs[b].contains);
	//and add also the item to be removed
	this.vertexs[a].contains.push(b);
	delete this.vertexs[b];

}



/// Vertex Class definition ////////////////////////////////////////////////////*
function Vertex(id, edges) {
	var i, a;

	this.id = parseInt(id, 10);
	this.edges = [];
	this.contains = [];

	for (i = 0 ; i < edges.length; i++) {
		a = parseInt(edges[i], 10);
		if (a) this.edges.push(a);
	}
}

Vertex.prototype.toString = function() {
	return "id: " + this.id + " || edges : " + this.edges.toString();
}
Vertex.prototype.swapEdge = function(a, b) {
	var keya = this.edges.indexOf(a);
	var keyb = this.edges.indexOf(b);
	keyb != -1 && this.edges.splice(keyb, 1);
	keya == -1 && this.edges.push(a);
}
Vertex.prototype.mergeEdges =function(newEdges, removeEdge) {
	for (var i = 0; i< newEdges.length; i++) {
		//avoid repetitions
		if (this.edges.indexOf(newEdges[i]) == -1 && newEdges[i] != this.id) {
			this.edges.push(newEdges[i]);
		}
	}
	
	if (removeEdge) {
		var toRemove = this.edges.indexOf(removeEdge);
		if (toRemove != -1) {
			this.edges.splice(toRemove, 1);
		}
	}
}
Vertex.prototype.getAdjacent =function() {
	return this.edges[0];
}


/// Find min kargerMinCut //////////////////////////////////////////////////////////
function MinCut(G, numEdge) {
	//var G = graph.clone('local');
	
	// console.log(G);
	num = 0;
	
	
	while (G.countVertexs() > 2) {
		if (!num) {
			debugger;
			var key = Object.keys(G.edges)[numEdge];
			var edge = key.split(',').map(function(a) { return parseInt(a, 10); });
			num++;
		} else {
			
			var edge = G.getRandomEdge();
		}
		
		//console.log("edge" + edge);
		G.mergeVertexs(edge);
		
	}

	
	for (var i in G.vertexs) {
		console.log(G.vertexs[i]);
	}
	console.log(G.edges);

	return G.edges[Object.keys(G.edges)[0]];

}



/// Sample data
sample1 = [
[1, 4, 2, 7, 3],
[2, 4, 1, 3],
[3, 1, 2, 4],
[4, 5, 1, 2, 3],
[5, 8, 7, 6, 4],
[6, 8, 5, 7],
[7, 6, 8, 5, 1],
[8, 7, 6, 5]
];


sample2 = [
[1, 2, 3, 4],
[2, 1, 3, 4],
[3, 1, 2, 4],
[4, 1, 2, 3, 5],
[5, 4, 6, 7, 8],
[6, 5, 7, 8],
[7, 5, 6, 8],
[8, 5, 6, 7]
];

sample3 = [
[1, 2, 3, 4, 5],
[2, 3, 4, 1],
[3, 4, 1, 2],
[4, 1, 2, 3, 8],
[5, 1, 6, 7, 8],
[6, 7, 8, 5],
[7, 8, 5, 6],
[8, 4, 6, 5, 7],
];

sampleMine = [[1, 2, 4], [2, 1, 3, 4], [3, 2, 4], [4, 1, 2, 3, 5], [5, 4]];



/// Main routine
var whatToSample = 0;



// var graph = getGraph(),


var minGlobalCut = Infinity;
var graph = getGraph(whatToSample);
var len = Object.keys(graph.edges).length;

// console.log(graph);
debugger;
var maxRun = len * 100;

for (var k = 0; k < maxRun; k++) {
console.log("----------------------------- CORRIDA " + k + " de " + maxRun + " min x ahora " + minGlobalCut);
	graph = getGraph(whatToSample);
	
	var thisMin = MinCut(graph, k%len);
	if (minGlobalCut > thisMin) {
		minGlobalCut = thisMin;
		minGlobalgraph = graph;	
	} 
}

console.log("MEJOR RESULTADO " + minGlobalCut);
console.log(minGlobalgraph);




