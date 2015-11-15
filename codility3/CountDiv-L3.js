/*
Write a function:

function solution(A, B, K);

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

{ i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Assume that:

A and B are integers within the range [0..2,000,000,000];
K is an integer within the range [1..2,000,000,000];
A ≤ B.
Complexity:

expected worst-case time complexity is O(1);
expected worst-case space complexity is O(1).

*/

// SOME FAILED CASES

function solution(A, B, K) {
   var firstMultiple = A % K == 0 ? A : A + K - (A % K);
   
   if (A == 0) firstMultiple = K;
   if (firstMultiple > B) return 0;
   
   return Math.floor((B - firstMultiple) / K) + 1;
}


//FROM INTERNET CORRECT

function solution(A, B, K) {
    if (A % K === 0) return Math.floor((B - A) / K + 1);

    return Math.floor((B - (A - (A % K) )) / K)
}