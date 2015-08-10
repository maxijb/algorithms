/// Dependencies
var fs = require('fs');
var extend = require("extend");
var async = require("async");

/// Read file and create graph //////////////////////////////////////////*/
function getGraph(data) {
	debugger;
	console.log("Loading file...");
	var content,
		grapho = new Graph("main");

	//if parsed before
	//if (graph.length) return graph;

	//if not mocked data
	if (!data) {
		data = fs.readFileSync('./SCC.txt', 'utf8');	
		console.log("Splllitting file...");
		content = data.split("\n");
	} else {
		// content = data.slice();
		content = data.map(function(arr) {
		    return arr.split(' ');
		});
	}	

	console.log("Generating graph...");

	//previous source item
	var old = 0;
	var edges = [];
    for (var i = 0 ; i <= content.length; i++) {
    	if (typeof content[i] == "string") {
    		var separator = content[i].indexOf(' ') != -1 ? " " : "\t";
    		content[i] = content[i].split(separator).map(function(a) { return parseInt(a, 10); });
    	}



    	var item = content[i];
    	// console.log(item);
    	if (!item || item[0] != old) {
    		if (old != 0) {
    			grapho.addVertex(new Vertex(old, edges));
    		}
    		if (item) {
    			old = item[0];
    			edges = [item[1]];
    		}
    	} else if (item[0] == old) {
    		edges.push(item[1])
    	} 
    }

    grapho.updateReverseEdges();
    debugger;
    return grapho;
}



/// Graph Class Definition
function Graph(id, vertexs, edges) {
	this.id = id || "graph";
	this.vertexs = vertexs || {};
	this.edges = edges || {};
}
Graph.prototype.addVertex = function(vertex) {
	this.vertexs[vertex.id] = vertex;
} 
Graph.prototype.updateReverseEdges = function() {

	console.log("Updating reverse edges...");
	var item, a, b, i, j, edge;

	for (i in this.vertexs) {
		item = this.vertexs[i];
		// console.log(item);
		a = item.id;
		for (j = 0; j < item.edges.length; j++) {
			b = item.edges[j];
			
			if (!this.vertexs.hasOwnProperty(b)) {
				this.addVertex(new Vertex(b, []));
			}

			this.vertexs[b] && this.vertexs[b].edgesReverse.push(a);
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
	this.edgesReverse = [];

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





/// Sample data
sample1 = [
	"1 4",
	"2 8",
	"3 6",
	"4 7",
	"5 2",
	"6 9",
	"7 1",
	"8 5",
	"8 6",
	"9 3",
	"9 7"
];





/// Main routine
var whatToSample = null;
var graph = getGraph(whatToSample);


// console.log(graph);
// console.log(graph.vertexs);
console.log("Getting componenets..");

console.log(getConectedComponets(graph));


function getConectedComponets(G) {
	var keys = Object.keys(G.vertexs);
	var seen = {};
	var finishingTime = [];
	var clusters = {};

	console.log("First run..");   


	// //First run getting finishingTime
	async.eachSeries(keys.reverse(), function(i, cb) {
			
		if (!seen.hasOwnProperty(i)) {
			DFSAsync(G.vertexs[i], "edgesReverse", "finishingTime", null, finishingTime, seen, function() {
				setImmediate(cb);
			});
		} else {
			setImmediate(cb);
		}
	},
	secondRun);


	function secondRun() {
		console.log("finishing time", finishingTime); 
		console.log("Second run..");

		//reset seen
		seen = {};
		async.eachSeries(finishingTime.reverse(), function(i, cb) {
			var leader = i.id;
			if (!seen.hasOwnProperty(leader)) {
				var cluster = [];
				seen[leader] = 1;
				DFSAsync(i, "edges", "cluster", cluster, finishingTime, seen, function() {
					clusters[leader] = cluster;
					setImmediate(cb);					
				});
			} else {
				setImmediate(cb);					
			}
		}, 
		countClusters);
	}

	
	function countClusters() {
		var count = [];
		for (var i in clusters) {
			count.push(clusters[i].length)
		}

		console.log(count.sort(function(a,b){ return b - a }).slice(0,5));
	}


	// //Second run gettiing leaders and SCCs
	// for (var i = finishingTime.length - 1; i >= 0; i--) {
	// 	var leader = finishingTime[i].id;
	// 	if (!seen.hasOwnProperty(leader)) {
	// 		var cluster = [];
	// 		seen[leader] = 1;
	// 		DFS(finishingTime[i], "edges", "cluster", cluster, finishingTime, seen);

	// 		clusters[leader] = cluster;
	// 	}
	// }

	return clusters;


	function DFSAsync(item, source, whatToGet, cluster, finishingTime2, seen2, cb) {
		seen2[item.id] = 1;
		if (whatToGet == "cluster") {
			cluster.push(item.id);
		}
		
		async.eachSeries(item[source], function(i, cbitem) {
			if (!seen2.hasOwnProperty(i)) {
					DFSAsync(G.vertexs[i], source, whatToGet, cluster, finishingTime2, seen2, function() {
						setImmediate(cbitem);
					});
			} else {
				setImmediate(cbitem);
			}
		},
		function() {
			if (whatToGet == "finishingTime") {
				finishingTime2.push(item);
			}
			setImmediate(cb);
		}
		);

	}

}