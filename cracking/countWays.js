function countWays(n) {

	if (n < 0) 
		return 0;
	else if (n == 0) 
		return 1;
	else {
		return countWays(n-1) + countWays(n-2) + countWays(n-3);
	}

}


function countWays(n, map, prev) {
	console.log('llega con', n, 'llamado por', m);

	map = map || [];

	if (n < 0) {

		console.log(+0);
		return 0;
	}
	else if (n == 0) {
		console.log(+1);
		return 1;
	}
	else if (typeof map[n] !== "undefined") {
		console.log('ya estaba seteado', n);
		return map[n];
	}
	else {
		console.log('llama la recursividad de las 2 anteiores');
		map[n] = countWays(n-1, map, n) + countWays(n-2, map, n);
		return map[n];
	}

}



function countWays(n, map, prev) {
	console.log('llega con', n, 'llamado por', m);

	map = map || [];

	if (n < 0) {

		console.log(+0);
		return 0;
	}
	else if (n == 0) {
		console.log(+1);
		return 1;
	}
	else if (typeof map[n] !== "undefined") {
		console.log('ya estaba seteado', n);
		return map[n];
	}
	else {
		console.log('llama la recursividad de las 3 anteiores');
		map[n] = countWays(n-1, map, n) + countWays(n-2, map, n) + countWays(n-3, map, n);
		return map[n];
	}

}