/// Dependencies
var fs = require('fs');
var extend = require("extend");

/// Read file and create graph //////////////////////////////////////////*/
function getGraph(data) {
	debugger;
	var content,
		grapho,

		films = {},
		actors = {},
		actorId,
		filmId,
		actor,
		film,
		item,
		maxActor = 0,
		maxFilm = 0;


	//if not mocked data
	if (!data) {
		data = fs.readFileSync('./imdb.txt', 'utf8');	
		content = data.split("\r\n");
	} else {
		// content = data.slice();
		content = data.map(function(arr) {
		    return arr.slice();
		});
	}	

    for (var i = 0 ; i < content.length; i++) {
    	if (typeof content[i] == "string") {

    		item = content[i].split('|');
    	}


    	//if not empty
    	if (!actors.hasOwnProperty(item[0])) {
    		actors[item[0]] = { edges: {}};
    	} 

    	if (!films.hasOwnProperty(item[1])) {
    		films[item[1]] = { actors: [] };
    	}

    	films[item[1]].actors.push(item[0]);

    }



    for (var i in films) {
    	film =films[i];

    	if (film.actors.length < 2) continue;


    	// console.log("oroginal" , film.actors);
    	
    	for (var j in film.actors) {
    		var copy = film.actors.slice();
    		copy.splice(j,1);
    		var actor = film.actors[j];
    			
    		// console.log(copy);
    		for (var h = 0; h < copy.length; h++) {
    			actors[film.actors[j]].edges[copy[h]] = 1;	
    		}
    	}

    	
    	
    }
    
    for (var j in actors) {
    	actors[j].degree = Object.keys(actors[j].edges).length;
    }
    return new Graph("main", actors);
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


var G = getGraph();
console.log(BFS(G, "James Earl Jones", "Kevin Bacon"));



function BFS(g, origin, objective) {
	var seen = {};
	var queue = [];
	var num = 0;
	if (!g.vertexs[origin] || !g.vertexs[objective]) {
		return -1;
	}

	return Search(origin, objective, 0);

	function Search(orig, objec, degree) {

		console.log("me paro en ",orig, ++num, "con orden", degree);

		if (orig == objec) {
			return degree;
		} else if (g.vertexs[orig].edges.hasOwnProperty(objec)) {
			return degree + 1;
		} else {
			//add this to seen
			seen[orig] = 1;
			var edges = g.vertexs[orig].edges;


			//Edges sorted by degree
			var edgesSorted = Object.keys(edges).sort(function(a, b) {
				return g.vertexs[a].degree < g.vertexs[b].degree;
			});

			//Keys unsorted
			var edgesUnSorted = Object.keys(edges);

			//which one are we going to use
			var chosen = edgesSorted;
			for (var i in chosen) {
				if (!seen.hasOwnProperty(chosen[i])) {
					seen[chosen[i]]= 1;
					queue.push({name: chosen[i], degree: degree+1});
				}
			}

			if (queue.length) {
				var item = queue.shift();
				return Search(item.name, objec, item.degree);
			} else {
				return -1;
			}
		}
	}


}