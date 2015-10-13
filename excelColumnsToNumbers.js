/* Write a function (with helper functions if needed) called to Excel that takes an excel column value 
(A,B,C,D…AA,AB,AC,… AAA..) and returns a corresponding integer value (A=1,B=2,… AA=26..).
*/

function excel(x) {
	var init = 64,
		y = x.split(''),
		multiplier = y.length;
		max = 25,
		res = 0;

	for (var i = 0; i < y.length; i++ ) {
		multiplier--;
		var chr = y[i].charCodeAt(0) - init;
		res += chr + (chr * multiplier *max);
	}


	return res;
}