Rand7 from Rand5

function rand5() { 
	return Math.ceil(Math.random()*5) 
}


function test(func) {
	var res = {};
	for (var i = 0; i < 1400; i++) {
		var temp = func();
		res[temp] = res[temp] ? res[temp] + 1 : 1;
	}
	console.log(res)
}

function rand7() {
	var temp;

	do {
		var temp = 5 * (rand5() - 1) + rand5();
	} while (temp > 21)

	return temp % 7 + 1;
}
test(rand7);

