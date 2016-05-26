var data = [
	[2, 1],
	[1, 2],
];


console.log(findComponents(data));

function findComponents(data) {
 	let G = createGraph(data);

 	let count = 0;
 	let queue = [];

 	G.forEach((node, i)=> {
 		if (!node.selected) {
 			if (i > 0) count++;
 			queue.push(node);
 			BFS();
 		}
 	});



 	return count;



 	function BFS() {
 		console.log(queue);
 	   if (!queue.length) return;
 	   
 	   let node = queue.pop();
 	   node.selected = true;
 	   node.edges.forEach(item => {
 	   		if (!G[item].selected) queue.push(G[item]);
 	   })
 	   
 	   return BFS();
 	}


 	function createGraph(data) {
 		let columns = {};
 		let rows = {};

 		data.forEach((point, i) => {
 			if (rows[point[0]]) {
 				rows[point[0]].push(i);
 			} else {
 				rows[point[0]] = [i];
 			}

 			if (columns[point[1]]) {
 				columns[point[1]].push(i);
 			} else {
 				columns[point[1]] = [i];
 			}
 		});

 		return data.map((point, i) => {
 			let edges = new Set((rows[point[0]] || []).concat(columns[point[1]] || []));
 			edges.delete(i);
 			return {point: point, edges: Array.from(edges)};
 		});

 	}
}