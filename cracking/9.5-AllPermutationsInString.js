/* Find all permutations of a string */



function subsets(set) {
	var results = [""],
		i;

	set = set.split('');

	set.forEach(function(x) {
		results.forEach(function(y) {
			
			for (var i = 0; i <= y.length; i++) {
				results.push(y.substr(0, i) + x + y.substr(i));
			}

		});
	});

	return results;
}

a = subsets("max");

console.log(a);
console.log(a.length);