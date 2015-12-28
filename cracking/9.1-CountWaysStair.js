/* Count ways of arriving to item N, taking 1, 2, or 3 steps on each iteration */


/* This algorithm runs in O(3^n) because we are running 3 recursive call per item */
function countWays(N) {
	
	return sub(1) + sub(2) + sub(3);

	function sub(step) {
		if (step == N) {
			return 1;
		} else if (step > N) {
			return 0;
		} else {
			return sub(step + 1) + sub(step + 2) + sub(step + 3);
		}
	}

}



/* Using dynamic programming we can cache the information for previously computed steps */
function countWaysDP(N) {
	
	var map = [];

	return sub(1) + sub(2) + sub(3);

	function sub(step) {
		if (step == N) {
			return 1;
		} else if (step > N) {
			return 0;
		} else if (map[step]) {
			return map[step];
		} else {
			map[step] = sub(step + 1) + sub(step + 2) + sub(step + 3);
			return map[step];
		}
	}

}


console.log(countWaysDP(3));