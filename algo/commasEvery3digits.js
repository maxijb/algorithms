a = 78638734743764237;
console.log(a);
console.log(commas(a));


function commas(num) {
 var work = num.toString(),
     len = work.length,
     i = 3,
     arr = [];
    
    
    while (true) {
        arr.unshift(work.substr(-i, 3))
    	console.log(i);
    	if (i > len) break
    	i += 3;
    }
    
    return arr.join(',');
    
}