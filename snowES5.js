var lines = parseInt(readline());
var points = [];
for (var i = 0; i < lines; i++) {
    var text = readline();
    points.push(text.split(' '));    
}

print(findComponents(points));

function findComponents(data) {
 	var G = createGraph(data);
 	
 	var count = 0;
 	var queue = [];

 	G.forEach(function(node, i) {
 		if (!node.selected) {
 			if (i > 0) count++;
 			queue.push(node);
 			BFS();
 		}
 	});



 	return count;



 	function BFS() {
 		
 	   if (!queue.length) return;
 	   
 	   var node = queue.pop();
 	   node.selected = true;
 	   node.edges.forEach(function(item) {
 	   		if (!G[item].selected) queue.push(G[item]);
 	   })
 	   
 	   return BFS();
 	}


 	function createGraph(data) {
 		var columns = {};
 		var rows = {};

 		data.forEach((point, i) => {
 			if (!rows[point[0]]) rows[point[0]] = {};
 			rows[point[0]][i] = 1;
 			
 			if (!columns[point[1]]) columns[point[1]] = {};
 			columns[point[1]][i] = 1;
 			
 		});

        

 		return data.map(function(point, i) {
 			var edges = Object.keys((rows[point[0]] || {})).concat(Object.keys(columns[point[1]] || {}));
 			return {id: i, edges: edges};
 		  
 		});

 	}
}