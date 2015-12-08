function qs(data) {

	//invoke subroutine to sort in place
	return inPlace(0, data.length -1);


	function inPlace(start, end) {

		//base case, no elements to sort
		if (end <= start) { return data; }

		//pick the pivot and set the pointers in the edges
		var pivot = pickPivot(start, end);
			i = start,
			j = end;

		//swap the pivot to the first place and update its pointer
		swap(pivot, start);
		pivot = start;

		//walk the subarray from the end to the start
		while (j > i) {
			//if its smaller than the pivot, then swap
			if (isBefore(data[j], data[pivot])) {
				swap(++i, j);
			} else {
				//otherwise move the pointer one step backwards
				j--;
			}
		}

		//swap the pivot with the last element which was smaller than it
		swap(i, pivot);

		//subroutines on the both pieces of the array
		inPlace(start, i-1);
		inPlace(i+1, end);

		//return ordered data
		return data;
	}


	/* Swaps two positions of the array */
	function swap(a, b) {
		var temp = data[a];
		data[a] = data[b];
		data[b] = temp;
	}


	//how to compare elements
	function isBefore(a, b) {
		return parseInt(a, 10) < parseInt(b, 10); 
	}


	//get the pivot
	function pickPivot(start, end) {
		//return last element
		return end;
	}

}





var data = [
1,
3,
9,
8,
4,
6,
10,
11,
2,
5,
7
];


	console.log(qs(data));