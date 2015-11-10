/// Dependencies
var fs = require('fs');
var extend = require("extend");
// var stdin = process.openStdin(); 
// require('tty').setRawMode(true);   





/// Read file and create graph //////////////////////////////////////////*/
function getGraph(data) {
	var content,
		grapho,

		edges = {},
		vertexs = {};


	//if not mocked data
	if (!data) {
		data = fs.readFileSync('/Users/mbenedetto/Sites/algorithms/dijkstraData.txt', 'utf8');	
		var separator = data.indexOf("\r\n") == -1 ? "\n" : "\r\n";
		content = data.split(separator);
	} else {
		// content = data.slice();
		content = data.map(function(arr) {
		    return arr.slice();
		});
	}	

    for (var i = 0 ; i < content.length; i++) {
    	if (typeof content[i] == "string") {
    		var separator = content[i].indexOf('\t') == -1 ? " " : "\t";
    		item = content[i].split(separator);
    	}

    	var vertex = new Vertex(item[0]);
    	vertexs[item[0]] = vertex;

    	for (var j = 1; j < item.length; j++) {
    		var edge = item[j].split(',').map(function(a) { return parseInt(a, 10); });
    		if (edge.length < 2) continue;
    		vertex.addEdge(edge[0], edge[1]);
    		
    		edges[getEdgeKey(edge[0], item[0])] = edge[1];
    	}

    }




    return new Graph("main", vertexs, edges);
}



function getEdgeKey(a, b) {
	return a < b ? a+'-'+b : b+'-'+a;
}

/// Graph Class Definition
function Graph(id, vertexs, edges) {
	this.id = id || "graph";
	this.vertexs = vertexs || {};
	this.edges = edges || {};
	// this.updateEdges();
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
	this.edges = edges || {};

}

Vertex.prototype.addEdge = function(node, weight) {
	this.edges[node] = weight;
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


var G = getGraph();
console.log(Dijkstra(G, 1, [7,37,59,82,99,115,133,165,188,197]).toString());



function Dijkstra(g, origin, wantedNumbers) {
	var X = {}; // viewed vertexs
	var W = {}; //weights of vertexs
	W[origin] = 0; //nitializae weight of sme node as 0
	


	Search(origin);

	var wanted = [];

	for (var j in wantedNumbers) {
		wanted.push(X[wantedNumbers[j]]);
	}

	return wanted;

	// console.log(X);

	function Search(node) {

		X[node] = W[node];
		delete W[node];

		// console.log("me paro en ",node);
		var edges = g.vertexs[node].edges;


		for (var i in edges) {
			var weight = edges[i];
			var vertexWeight = X[node] + weight;

			if (!X.hasOwnProperty(i) && (!W.hasOwnProperty(i) || W[i] >= vertexWeight)) {
				W[i] = vertexWeight;
			}
		}

		var min = Infinity,
			minId = null;

		for (var i in W) {
			if (W[i] < min) {
				min = W[i];
				minId = i;
			}
		}

		return minId ? Search(minId) : null;

	}


}