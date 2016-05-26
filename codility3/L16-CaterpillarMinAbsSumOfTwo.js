/*
MinAbsSumOfTwo
Find the minimal absolute value of a sum of two elements.
Task description
Let A be a non-empty zero-indexed array consisting of N integers.

The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

For example, the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2). 
The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2. 
The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5. 
The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2. 
The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8. 
The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1. 
The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6. 
Write a function:

function solution(A);

that, given a non-empty zero-indexed array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array A:

  A[0] =  1
  A[1] =  4
  A[2] = -3
the function should return 1, as explained above.

Given array A:

  A[0] = -8
  A[1] =  4
  A[2] =  5
  A[3] =-10
  A[4] =  3
the function should return |(−8) + 5| = 3.

Assume that:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].
Complexity:

expected worst-case time complexity is O(N*log(N));
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
*/


function solution(A) {
    A = A.sort(function(a, b) { return parseInt(a, 10) - parseInt(b, 10); });
    
    var max = Infinity,
        localMax = Infinity,
        len = A.length,
        i, j, k,
        maxj = len-1;
    
    
    if (len < 1) return 0;
    
    for (i = 0; i < len; i++) {
        
        max = Math.min(max, Math.abs(A[i] + A[i]));
        localMax = Infinity;
        
        for (j = maxj; j > i; j--) {
            k = Math.abs(A[i] + A[j]);
            if (k <= localMax) {
                localMax = k;
                maxj = j;
            }
            else break;
        }

       max = Math.min(max, localMax);

    }
    
    return max;
}