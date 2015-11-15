function changeProblemBruteForce(coins, amount, state) {
	var nextIteration = 0,
		defaultState = {quantity: Infinity, current: [] };

	if(!coins.length) return copy(defaultState); 

	//first run
	if (!state) { 
		state = copy(defaultState);
	} else {

		var bills = Math.floor(amount / coins[0]);
		if (bills) {
			state.quantity = state.quantity == Infinity ? bills : state.quantity + bills;
			state.current.push({type: coins[0], quantity: bills})
		}
		amount -= bills * coins[0];
		//we'll skip this coin in next iteration
		nextIteration = 1;
		
	}

	if (amount == 0) return copy(state);

	var result1 = changeProblemBruteForce(coins.slice(nextIteration), amount, copy(state));
	var result2 = changeProblemBruteForce(coins.slice(nextIteration+1), amount, copy(state));
	
	return result1.quantity > result2.quantity ? result2 : result1;
	

	function copy(data) {
		return {
			quantity: data.quantity,
			current: data.current.slice(0)
		}
	}


}


var coins 	= [10,8,5,1],
	amount 	= 34;
console.log(changeProblemBruteForce(coins, amount));