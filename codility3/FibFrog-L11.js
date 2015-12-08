/* FibFrog-L11

The Fibonacci sequence is defined using the following recursive formula:

    F(0) = 0
    F(1) = 1
    F(M) = F(M - 1) + F(M - 2) if M >= 2
A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

The leaves on the river are represented in a zero-indexed array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.
The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:

function solution(A);

that, given a zero-indexed array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:

    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
the function should return 3, as explained above.

Assume that:

N is an integer within the range [0..100,000];
each element of array A is an integer that can have one of the following values: 0, 1.
Complexity:

expected worst-case time complexity is O(N*log(N));
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.

*/



function solution(A) {
  
    var N = A.length,
        jumps = [],
        fibs = [0, 1],
        i = 1;
    
    //adds the second bank to the end of the array, so we dont have to check for special case
    A.push(1);
        
        
        
    //store fibs
    while(fibs[i] <= N) {
        i++;
        fibs[i] = fibs[i-1] + fibs[i-2];
    }
    
    
    //Walk every array item
    for (i=0; i <= N; i++) {


        // if there's no leave skip this item
        if (A[i]) {
        
	        //check every fibonacci number
	        for (var j = fibs.length -1; j > 0; j--) {
	           
	            //current position minus fibonnaci number
	            var prevPos = i - fibs[j];
	            
	            //if previous position is the first bank or that position is reachable 
	            if (prevPos == -1 || jumps[prevPos]) {
	                
	                // set the min jump for that number
	                jumps[i] = Math.min(jumps[i] || Infinity, 1 + (jumps[prevPos] || 0));    
	            }
	        }

        }
        
    
    }
    

	//return last result or impossible    
    return jumps[N] || -1;
}