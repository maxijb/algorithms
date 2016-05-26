var arr = [2,3,4,5,6,7,8,9,12,13,14,15,16,18,20,24,25,28,29,30,35,37,38,39,40];

console.log(binarySearch(arr, 12));



function binarySearch(arr, search) {
		

	return subroutine(0, arr.length-1);


	function subroutine(min, max) {

		var index 	= median(min, max),
			item 	= arr[index];

		if (item == search) {
			return index;
		}	
		else if (min >= max ) {
			return false;
		} else {
			
			return item > search ? 
				subroutine(min, index-1)
				:
				subroutine(index+1, max);

		}
	}

	function median(start, finish) {
		return (start + (finish - start) / 2) | 0;
	}
}

