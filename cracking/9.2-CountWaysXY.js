function countWays(xx, yy) {
	var map = Array.apply(null, Array(xx+1)).map(function() { return [] });

	return sub(0,1) + sub(1,0);

	function sub(x, y) {

		if (x == xx && y == yy) {
			return 1;
		} else if (x > xx || y > yy) {
			return 0;
		} else if (map[x][y]) {
			return map[x][y];
		} else {
			map[x][y] = sub(x+1, y) + sub(x, y+1);
			return map[x][y];
		}

	}


}


console.log(countWays(2,3));