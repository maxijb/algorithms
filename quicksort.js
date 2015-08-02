var x = 0;
var used = {};



function qs(data) {
	debugger;

	return divide(0, data.length -1);



	function divide(start, end) {
		


		//base case with one element
		if (end <= start) {
			// console.log("NULL " + start + " " + end); 
			used[data[end]] = 1;
			return data; 
		}

		var y = (end - start);

		x += y;

		console.log(start + " - " + end + ", " + y + " : " + x);
		console.log(data.slice(start, (end+1)).toString());

		var pivot = pickPivot(start, end),
			i,
			firstBigger = start == pivot ? start +1: start,
			notMoved = true;


		if (used[data[pivot]]) {
				console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[REPE " + data[i] + " " + i);
				// process.exit();
			}

		used[data[pivot]] = 1;


		for (i = start; i <= end; i++) {
			
			//if pivot, do not compare
			if (i == pivot) continue;

			if (used[data[i]]) {
				console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[REPE " + data[i] + " " + i);
				// process.exit();
			}



			if (isBefore(data[i],data[pivot])) {
				swap(i,firstBigger);
				firstBigger++;
				notMoved = false;

			} 
		}


		if (end - start == 1) {
				used[data[start]] = 1;
			}


		var swapWith = pivot >= firstBigger || firstBigger == start ? firstBigger : firstBigger-1;

		if (notMoved) {
			swapWith = start;
		console.log('p:' + pivot + " pv: " + data[pivot] + " | s:"+ swapWith + " diferencia con firstBigger " + (swapWith - firstBigger)  + " de datos " + data[firstBigger-1] + '|' + data[firstBigger]+'|'+(firstBigger < end ? data[firstBigger+1] : '') )
		}




		//swap the pivot with j
		swap(pivot, swapWith);
		// for (var f = start; f <= end; f++) {
		// 	if (f > swapWith && data[f] < data[swapWith]) {
		// 		console.log(f + " " + data[f] + ' ' + swapWith + ' ' + data[swapWith] + " " + (data[f] < data[swapWith]) );
		// 		console.log(data[f] + ' ' + data[swapWith]);
		// 	}
		// 	if (f < swapWith && data[f] > data[swapWith]) console.log("siii222");
		// }


		console.log('res swapWith ' + swapWith);
		console.log(data);
		
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



var fs = require('fs');
// var txt = fs.readFileSync('IntegerArray.txt');

// fs.readFile('./100.txt', 'utf8', function read(err, data) {
//     if (err) {
//         throw err;
//     }

//     var content = data.split("\r\n");

//     for (var i = 0 ; i < content.length; i++) {
//     	content[i] = parseInt(content[i], 10);
//     }

//     var data = qs(content);
//     console.log(data);
//     console.log(x);

//     var temp = -1;
//     for (var g = 0; g < data.length; g++) {
//     	if (data[g] < temp) console.log("hay un errorr" + g);
//     	temp = g;
//     }

//     console.log(Object.keys(used).map(function(d, i) {  return parseInt(d, 10); }).sort(function(a, b) { return parseInt(a, 10) - parseInt(b, 10); }));


// });




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

var data =  [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
	qs(data);
	console.log(x);