function sieve(N) {

	let arr = Array.apply(null, Array(N)).map((x, i) => i);

	let max = Math.sqrt(N);

	let markMultiples = (K) => {
		let count = 1;
		while ((++count) * K < N) {
			arr[count*K] = 0;
		}
	}

	markMultiples(2);
	for (let i = 3; i <= max; i = i+2) {
		markMultiples(i);
	}

	return arr.filter(x => x > 1);	
	
}


let s20 = sieve(20);
console.log(s20);