/* Find all subsets in a set */



function subsets(set) {
	var results = [[]],
		i;

	set.forEach(function(x) {
		results.forEach(function(y) {
			results.push(y.concat(x));
		});
		// results.push([x])
	});

	return results;
}

console.log(subsets([1, 2, 3]));