var travels = [1,2,4,5,7,29,30];

console.log(findCheaper(travels));


function findCheaper(when) {

	//value per kind of trip
	var values = {1: 2, 7: 7};

	//where to store best values
	var mem = new Array(when.length);

	
	//////////////////////////////////////////
	return Math.min(25, test(0, 0, 0));
	//////////////////////////////////////////


	function test(startIndex, dateCovered, value) {

		//Find the first index not already covered by the previous solution
		while (travels[startIndex] <= dateCovered && startIndex < when.length) {
			startIndex++;
		}  

		//if we exceed the array return current value
		if (startIndex == when.length) return value;

		//if we know the best solution from here
		if (typeof mem[startIndex] !== "undefined") {
			//return it summed to the current value
			return mem[startIndex] + value;
		}
		
		var thisDate = travels[startIndex];

		//best possible option from here
		var minFound = Math.min(test(startIndex+1, thisDate, value + values[1]), test(startIndex+1, thisDate+6, value+values[7]));
		
		//store the best solution minus what we already had
		mem[startIndex] = minFound - value;

		//return best solution
		return minFound;

	}

}