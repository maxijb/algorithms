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
		console.log(data.slice(start, (end+1)));

		var pivot = pickPivot(start, end),
			i = start,
			j = end;


		while (i < j) {
			
			if (i == pivot) i++;
			else if (j == pivot) j--;
			else {

				var iMinor = isBefore(data[i], data[pivot]);
				var jMinor = isBefore(data[j], data[pivot]);

				if (!iMinor && jMinor) {
					swap(i,j);
					i++;
					j--;
				} else if (!jMinor) { j--; 
				} else if (iMinor) { i++; 
				}
			
			}

		}
		
		debugger;
		if (pivot < i && i > start )
			var swapWith = i - 1;
		else 
			var swapWith = i;


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
		return end;
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




var data = [
1,
3,
9,
8,
4,
6,
10,
2,
5,
7,
11
];


	qs(data);
	console.log(x);





