/* 
Create a stack, which uses behind the scenes a set of stacks (or arrays) with a maximun size.
It shoudl be transparent ot the client user of the stackSet.
It would work like a pile of plates which cannot be too high beacuase it would break
*/

function stackSet(max) {
	
	//public property
	this.data 	= [[]];

	//private properties
	var list 	= 0,
		max 	= max || 3,
		current = this.data[0];


	//add element
	this.push = function(item) {
		if (current.length == max) {
			this.data.push([]);
			current = this.data[++list];
		}

		current.push(item);
	}

	//remove element from stack
	this.pop = function() {
		var value = current.pop();
		if (!current.length && list > 0) {
			this.data.pop();
			current = this.data[--list];
		}
		console.log(this.data);
		return value;
	}

	//popAt the desired position
	this.popAt = function(index) {
		var fromList = Math.floor(index / max),
			actualIndex = index - max * fromList;

		if (list >= fromList && this.data[fromList].length > actualIndex) {

			var value = this.data[fromList].splice(actualIndex, 1);

			while(fromList < list) {
				this.data[fromList].push(this.data[list].shift());
				fromList++;
			}

			checkIfRemoveList.call(this);

			return value;
		
		} else {
		 	return null;
		}

	}


	//primvaet method checks if removing the last list is required
	function checkIfRemoveList() {
		if (!current.length && list > 0) {
			this.data.pop();
			current = this.data[--list];
		}
	}


}