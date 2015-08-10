var x = 0;



function qs(data, method) {
	debugger;

	return divide(0, data.length -1);



	function divide(start, end) {
		


		//base case with one element
		if (end <= start) {
			return data; 
		}

		var y = (end - start);

		x += y;

		// console.log(start + " - " + end + ", " + y + " : " + x);
		// console.log("quedan " + data.slice(start, (end+1)).toString());

		var pivot = pickPivot(start, end);

		if (pivot != start) {
			swap(pivot, start);
			pivot = start;
		}

		var	i,
			firstBigger = start == pivot ? start +1: start,
			notMoved = true;


		for (i = start; i <= end; i++) {
			
			//if pivot, do not compare
			if (i == pivot) continue;

			if (isBefore(data[i],data[pivot])) {
				swap(i,firstBigger);
				firstBigger++;
				notMoved = false;

			} 
		}

		var swapWith = pivot >= firstBigger || firstBigger == start ? firstBigger : firstBigger-1;

		if (notMoved) {
			swapWith = start;
		}




		//swap the pivot with j
		swap(pivot, swapWith);
		

		// console.log('res swapWith ' + swapWith);
		// console.log(data);
		
		//call the recursive call over the two pieces
		divide(start, (swapWith-1));
		divide((swapWith+1), end);
		
		return data;
	}


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
		//return first element
		if (!method || method == "start") return start;
		if (method == "end") return end;
		if (method == "median") {
			
			var middle = start + (end - start) / 2 | 0,
				values = [ 
					data[start],
					data[end], 
					data[middle]
				].sort(function(a, b) { return a-b});


			// console.log(values);
			// console.log(values[1]);


			if (data[start] == values[1]) return start;
			if (data[end] == values[1]) return end;
			if (data[middle] == values[1]) return middle;
		}
	}

}



var fs = require('fs');
var txt = fs.readFileSync('IntegerArray.txt');

fs.readFile('./10000.txt', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }

    var content = data.split("\r\n");

    for (var i = 0 ; i < content.length; i++) {
    	content[i] = parseInt(content[i], 10);
    }

    x = 0; var met = "start", data = [].concat(content);
    qs(data, met);
    console.log(x, met);

    x = 0; var met = "end", data = [].concat(content);
    qs(data, met);
    console.log(x, met);

    x = 0; var met = "median", data = [].concat(content);
    qs(data, met);
    console.log(x, met);

    // x = 0;
    // var data = qs(content, "end");
    // console.log(x, "median");
    
    // x = 0;
    // var data = qs(content, "median");
    // // console.log(data);
    // console.log(x, "median");

});




// var data = [57, 97, 17, 31, 54, 98, 87, 27, 89, 81, 18, 70, 3, 34, 63, 100, 46, 30, 99, 10, 33, 65, 96, 38, 48, 80, 95, 6, 16, 19, 56, 61, 1, 47, 12, 73, 49, 41, 37, 40, 59, 67, 93, 26, 75, 44, 58, 66, 8, 55, 94, 74, 83, 7, 15, 86, 42, 50, 5, 22, 90, 13, 69, 53, 43, 24, 92, 51, 23, 39, 78, 85, 4, 25, 52, 36, 60, 68, 9, 64, 79, 14, 45, 2, 77, 84, 11, 71, 35, 72, 28, 76, 82, 88, 32, 21, 20, 91, 62, 29] ;


// // var data = [3,
// // 			9,
// // 			8,
// // 			4,
// // 			6,
// // 			10,
// // 			2,
// // 			5,
// // 			7,
// // 			1];

// var data =   [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
// 	qs(data, 'median');
// 	console.log(x);