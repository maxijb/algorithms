function quicksort(a, l, r) { 

	var i = l-1, 
		j = r; 

	var v = a[r],
		br = "";


 	if (r <= l) return;
 	while (br != "break");
 	{
 		while (a[++i] < v ) { console.log(i);};
 		while (v < a[--j]) { if (j == l) br = "break"};
 		if (i >= j) br = "break";
 		exch(i, j);
 	}
 	exch(i, r);
 	quicksort(a, l, i-1);
 	quicksort(a, i+1, r);
	

	function exch(aa, bb) {
		var temp = a[aa];
		a[aa] = a[bb];
		a[bb] = temp;
	}
}

debugger;

var data =   [7, 5, 1, 4, 8, 3, 10, 2, 6, 9];
	// qs(data);
	console.log(quicksort(data, 0, data.length-1));