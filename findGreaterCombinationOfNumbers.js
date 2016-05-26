/*
Given a list of integers, find the highest value obtainable by concatenating these together. 

For example, given 9, 918, 917 - The answer is 9918917. 
But given 1,112,113 - The answer is 1131121

*/


nums = [234, 9, 915, 9, 8, 8, 812, 813, 11];

function greaterNumber(arr) {
		 
    var arb = arr.sort(function (a, b) {
       var aa = a.toString().split(''),
       		 bb = b.toString().split(''),
           la = aa.length,
           lb = bb.length,
           len = Math.max(la, lb),
           i, na, nb;
        
       for (i = 0; i < len; i++) {
       		 if (i == la) return -1;
           if (i == lb) return 1;
       
           var na = parseInt(aa[i], 10),
           		 nb = parseInt(bb[i], 10);
         
           if (na > nb) return -1;
           else if (nb > na) return 1;
           
       }
           
       
    });
    
    return arb.join('.');

}


console.log(greaterNumber(nums));