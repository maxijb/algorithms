var arr = [2,3,4,5,6,7,8,9,12,13,14,15,16,14,13,12,11,9,8,6,5,3,2];
goldenSection(arr);



function goldenSection(arr) {
		
		console.log(arr);
		var index 	= median(0, arr.length),
			item 	= arr[index];
			console.log(index + "   " + item);

		if ((arr[index] > arr[index+1] && arr[index] > arr[index-1])|| arr.length == 1) {
			console.log("res:" + index + "   " + item);
			return arr[index];
		}
		else {
			
			return arr[index] > arr[index - 1] ? 
				goldenSection(arr.slice(index+1, arr.length))
				:
				goldenSection(arr.slice(0, index));

		}


	

	function median(start, finish) {
		return start + (finish - start) / 2 | 0;
	}
}

