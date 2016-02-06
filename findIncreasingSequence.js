var arr = [2,-3,5,-2,7,-1,2,1,-11,3,4];
console.log(findIncreasing(arr));


function findIncreasing(a) {
	var max = -Infinity,
		maxSequence = [],

		currentMax = -Infinity,
		currentSequence = [],

		len = a.length,
		i;

		for (i = 0; i < len; i++) {
			if (currentMax + a[i] > a[i]) {
				console.log('aq');
				currentMax += a[i];
				currentSequence.push(a[i]);
			} else {
				console.log('aqui');
				currentMax = a[i];
				currentSequence = [arr[i]];
			}

			if (currentMax > max) {
				max = currentMax;
				maxSequence = currentSequence.slice();
			}
		}

		return {max: max, sequence: maxSequence};
	

}