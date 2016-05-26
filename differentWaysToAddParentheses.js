var stri = "1+2*5-3-4*2";

console.log(maximizeValue(stri));


function maximizeValue(data) {
	
	results = [];
	console.log(data);

	return calculate(data, 0).reduce(function(prev, x) { return Math.max(prev, x) }, -Infinity);






	function calculate(str, level) {
		
		var results = [];

		var left, right, j, k;

		if (!str.length) return 0;

		if(!/\+|\-|\*/.test(str)){ // + - * 
            return [parseInt(str)];
        }

		for (var i = 0; i < data.length; i++) {
			
			var charat = str.charAt(i);
			if (charat == "+" || charat == '-' || charat == "*") {

				left = calculate(str.substring(0, i), level+1);
				right =  calculate(str.substring(i+1), level+1);	


				for (j = 0; j < left.length; j++) {
					for (k = 0; k < right.length; k++) {
						if (charat == "*") 
							results.push(left[j] * right[k]);
						else 
							results.push(charat == "+" ? left[j] + right[k] : left[j] - right[k]);
					}
				}

			} 
		}

		return results;
		

	}

}