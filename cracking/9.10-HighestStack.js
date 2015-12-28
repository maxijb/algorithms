function highestStack(d) {

	var data = d.slice().sort(function(a, b) { return b.x - a.x }),
		i, j,
		maxStack = 0,
		stacks = [];

	console.log(data);

	for (i = 0; i < data.length; i++) {
		for (j = i-1; j >= 0; j--) {
			console.log(i, j, data[i], data[j], (data[j].y >= data[i].y && data[j].z >= data[i].z));
			if (data[j].y >= data[i].y && data[j].z >= data[i].z) {
				stacks[i] = Math.max((stacks[i] || 0), stacks[j] + data[i].z);
			} else {
				stacks[i] = Math.max((stacks[i] || 0), data[i].z);
			}
			console.log(stacks);
			maxStack = Math.max(maxStack, stacks[i]);
		}
	}

	return maxStack;

}










var arr = [
	{x: 4, y: 3, z: 3},
	{x: 3, y: 3, z: 5},
	{x: 2, y: 2, z: 4},
	{x: 2, y: 3, z: 6},
	{x: 1, y: 1, z: 1},
];

console.log(highestStack(arr));