var circle = [30,31,32,40,50,55,60,80,2,3,5,6,8,10,11,12,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

function getCircleStart(arr_complete) {

	return subroutine(arr_complete, 0, arr_complete.length -1);

	function subroutine(arr) {
		console.log(arr);
		var index 	= median(0, arr.length),
			item 	= arr[index];
			console.log(index + "   " + item);

		if (arr[index] < arr[index-1] || arr.length == 1) {
			console.log("res:" + index + "   " + item);
			return arr[index];
		}
		else {
			
			return arr[index] > arr[arr.length - 1] ? 
				subroutine(arr.slice(index, arr.length))
				:
				subroutine(arr.slice(0, index));



		}
	}


	

	function median(start, finish) {
		return start + (finish - start) / 2 | 0;
	}

}

setTimeout(function() { process.exit() }, 20);

getCircleStart(circle);
