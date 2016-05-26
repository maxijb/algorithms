var data = [2,1,4,6,3,2,8,9];
data = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

console.log(lis(data));


function lis(arr) {
	
	var maxlen = 0;
	var sequence = [];

	for (var i = 0, l = arr.length; i < l; i++) {
		var num = arr[i];
		console.log('...................');
		console.log(i, num);

		if (!sequence.length || sequence[maxlen-1] < num) {
			console.log('agrega');
			sequence[maxlen++] = num;
		} else {
			findPlace(num, 0, maxlen);
		}

		console.log(sequence);

	}

	return maxlen;


	function findPlace(n, min, max) {
		
		while (min < max) {
			var mid = min + (max - min) / 2 | 0;
			var midN = sequence[mid];

			if (midN == n) {
				return;
			}
			else if(midN > n && (mid == 0 || sequence[mid-1] < n)) {
				min = max = mid;
			} else if (midN > n) {
				max = mid-1;
			} else if (midN < n) {
				min = mid + 1;
			}

		}

		sequence[min] = n;
	}




}