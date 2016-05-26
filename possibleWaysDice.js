
console.log(findWays(4, 6, 19));



function findWays(n, m, x) {
	
	var possible = {};

	routine(0, 0, "");

	return Object.keys(possible);


	function routine(dice, sum, key) {
		if (dice == n) {
			return sum == x ? key : null;
		}

		for (var i = 1; i <= m; i++) {
			var result = routine(dice+1, sum+i, key ? key + '|'+i : i);
			if (result) possible[getUniqueKey(result)] = 1;
		}
	}

	function getUniqueKey(key) {
		return key.split('|').sort().join('|');
	}
	
}
