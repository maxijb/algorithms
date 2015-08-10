var x = 0;



function qs(data) {
	debugger;

	return divide(0, data.length -1);



	function divide(start, end) {
		


		//base case with one element
		if (end <= start) { return data; }

		var y = (end - start);

		x += y;

		console.log(start + " - " + end + ", " + y + " : " + x);
		// console.log(data.slice(start, (end+1)));

		var pivot = pickPivot(start, end),
			i,
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
		console.log('res swapWith ' + swapWith);
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
		return start;
	}
}



// var fs = require('fs');
// // var txt = fs.readFileSync('IntegerArray.txt');

// fs.readFile('./100.txt', 'utf8', function read(err, data) {
//     if (err) {
//         throw err;
//     }

//     var content = data.split("\r\n");
//     var data = qs(content);



// });




var data = [3,
			9,
			8,
			4,
			6,
			10,
			2,
			5,
			7,
			1];
	qs(data);
	console.log(x);








