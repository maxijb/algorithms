var arr = [2,3,4,5,6,7,8,9,12,13,14,15,16];
binarySearch(arr, 2);



function binarySearch(arr, search) {
		
		console.log(arr);
		var index 	= median(0, arr.length),
			item 	= arr[index];
			console.log(index + "   " + item + "  " + search);

		if (item == search) {
			console.log("res:" + index + "   " + item);
			return index;
		}	
		else if (arr.length < 2) {
			console.log('doesnt exists');
			return false;
		} else {
			
			return item < search ? 
				binarySearch(arr.slice(index+1, arr.length), search)
				:
				binarySearch(arr.slice(0, index), search);

		}


	

	function median(start, finish) {
		return start + (finish - start) / 2 | 0;
	}
}

