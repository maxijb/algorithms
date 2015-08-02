var x = 0;

function qsort(a) {
     //base case
     if (a.length === 0) return [];

     x += a.length-1;
     //setting the pivot as the last element.
     var left = [],
         right = [],
         pivot = a[a.length - 1];

     //look before the pivot. everything less than it goes to its left, more than it, to its right.
     for (var i = a.length - 2; i >= 0; i--) {
         a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
     }
     //you then do this recursively until the basecase, pivoting/sorting all sub arrays, then concatenating the left side with the pivot and the right side.
     return qsort(left).concat(pivot, qsort(right));
 }

 console.log(qsort([8, 10, 1, 9, 7, 2, 6, 3, 5, 4]));
 console.log(x);