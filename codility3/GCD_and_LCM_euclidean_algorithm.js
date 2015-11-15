// Euclidean greater divisor by substraction
// it's running time == O(n) == O(a+b) 
function gcd(a, b) {
	if (a == b) return a;

	return (a>b) ? gcd(a-b, b) : gcd(a, b-a);
}


// Euclidean greater divisor by division
// rnuning time: O(log(a+b)) == O(log(N))
function gcd(a, b) {
	console.log('llegan', a, b);
	if (a % b === 0) 
		return b;
	else 
		return gcd(b, a % b);
}


// Getting the least common multiple from greates divisor
function lcm(a, b) {
	return a * b / gcd(a,b);
}


