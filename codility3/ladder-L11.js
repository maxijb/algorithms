/* Ladder-L11

You have to climb up a ladder. The ladder has exactly N rungs, numbered from 1 to N. With each step, you can ascend by one or two rungs. More precisely:

with your first step you can stand on rung 1 or 2,
if you are on rung K, you can move to rungs K + 1 or K + 2,
finally you have to stand on rung N.
Your task is to count the number of different ways of climbing to the top of the ladder.

For example, given N = 4, you have five different ways of climbing, ascending by:

1, 1, 1 and 1 rung,
1, 1 and 2 rungs,
1, 2 and 1 rung,
2, 1 and 1 rungs, and
2 and 2 rungs.
Given N = 5, you have eight different ways of climbing, ascending by:

1, 1, 1, 1 and 1 rung,
1, 1, 1 and 2 rungs,
1, 1, 2 and 1 rung,
1, 2, 1 and 1 rung,
1, 2 and 2 rungs,
2, 1, 1 and 1 rungs,
2, 1 and 2 rungs, and
2, 2 and 1 rung.
The number of different ways can be very large, so it is sufficient to return the result modulo 2P, for a given integer P.

Write a function:

function solution(A, B);

that, given two non-empty zero-indexed arrays A and B of L integers, returns an array consisting of L integers specifying the consecutive answers; position I should contain the number of different ways of climbing the ladder with A[I] rungs modulo 2B[I].

For example, given L = 5 and:

    A[0] = 4   B[0] = 3
    A[1] = 4   B[1] = 2
    A[2] = 5   B[2] = 4
    A[3] = 5   B[3] = 3
    A[4] = 1   B[4] = 1
the function should return the sequence [5, 1, 8, 0, 1], as explained above.

Assume that:

L is an integer within the range [1..30,000];
each element of array A is an integer within the range [1..L];
each element of array B is an integer within the range [1..30].
Complexity:

expected worst-case time complexity is O(L);
expected worst-case space complexity is O(L), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.



*/



/* Two fundamental pieces of knowledge we can get from this algorithm...

1) if mods are multiples of one another, they are congruent, which means that if I store the mod 16 of any number 9rather than the full number), it will not change the value for mod 8, mod 4, mod 2, becuase they are multiples!!!! 

2) the ladders count of ways to step up: we can use fibonacci numbers for it... 
in a way that countWaysforStep[n] == fibs[n+1]
countWaysforStep[4] == fibs[5] == 5

*/


function solution(A, B) {
    var len = A.length,
        max = Math.max.apply(null, A),
        //max mod 
        maxMod = 1 << Math.max.apply(null, B),
        fibs = [],
        results = [],
        i = 1;
        
    //Start fibonacci sequence
    fibs[0] = 0;
    fibs[1] = 1;
    
    //calculate fibs up to the max value, but store the module with the maxMod to avoid huge numbers
    //after all, we only need the mod to smallest congruent factor
    while(i <= max) {
        i++;
        fibs[i] = (fibs[i-1] + fibs[i-2]) % maxMod;
    }
    
    //the number of ways is the fibonaccion number for the next value of i
    //get the mod with the power of 2
    for (i = 0; i < len; i++) {

        results.push(fibs[A[i]+1] % (1 << B[i]));
    }
    
    return results;
}