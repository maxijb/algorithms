/*
Algoritmos biases: 

a fast algorith should have: 
- analisys by worst case running
- time grows slowly with input size  
- low order operations: ignore them because it can be different in the implementations, and even more on machine code


Sweet spot: matehmatical trackability and predictive power. Big O notation
*/

function MergeSort(items, keep, comparator) {

    //accepts a custom comparator
    if (typeof keep === "function") {
        comparator = keep;
        keep = false;
    }
    
    //accepts a custom comparator
    if (typeof comparator !== "function") {
        comparator = function(a, b) {
            return parseInt(a, 10) <= parseInt(b, 10);
        }
    } 

    var inversions = 0;

    //init recursion
    return startSort(items);


    //subroutine that splits the lists and call the sort
    function startSort(items) {

        if (items.length < 2) {
            return items;
        }

        var middle = (items.length / 2) | 0,
            left    = items.slice(0, middle),
            right   = items.slice(middle),
            params = merge(startSort(left), startSort(right));

            if (!keep) {
                return params;
            } else {
                params.unshift(0, items.length);
                items.splice.apply(items, params);
                return items;
            }
    }


    function merge(left, right){
        var result  = [],
            il      = 0,
            ir      = 0,
            ll = left.length,
            rl = right.length;

        while (il < ll && ir < rl){
            //compare and the lowest to the menu
            if (comparator(left[il], right[ir])){
                result.push(left[il++]);
            } else {
                result.push(right[ir++]);
                
                /////////////////////////////////////
                /////////////////////////////////////
                /// INVERSIONS add an inversion for all element remaining on the left array
                /////////////////////////////////////
                inversions+= left.length - il;
                console.log(inversions);
                /////////////////////////////////////
                /////////////////////////////////////
            }
        }
        //concat remainig ordered elements
        return il < ll ? 
                  result.concat(left.slice(il)) 
                : result.concat(right.slice(ir));
    }

}

// MergeSort([76, 85, 59, 142, 67, 51, 133, 64, 42, 128, 9, 153, 169, 114, 193, 162, 90, 77, 14, 154, 151, 182, 18, 160, 197, 26, 143, 178, 137, 166, 1, 74, 152, 122, 185, 10, 78, 107, 84, 113, 116, 28, 175, 124, 129, 89, 30, 29, 163, 49, 40, 101, 66, 19, 80, 119, 135, 57, 38, 104, 73, 32, 146, 2, 91, 99, 190, 58, 132, 23, 194, 75, 167, 79, 123, 112, 199, 131, 60, 55, 47, 174, 17, 168, 52, 155, 109, 200, 161, 136, 195, 111, 25, 71, 145, 88, 24, 81, 186, 16, 130, 179, 68, 65, 83, 156, 53, 148, 4, 196, 33, 50, 3, 94, 34, 45, 36, 147, 35, 70, 62, 69, 191, 141, 22, 46, 183, 126, 87, 13, 159, 103, 127, 144, 8, 11, 41, 189, 198, 54, 56, 108, 176, 106, 173, 97, 21, 164, 98, 172, 171, 170, 149, 110, 138, 31, 125, 63, 82, 192, 39, 92, 95, 15, 7, 105, 187, 180, 5, 6, 44, 102, 134, 188, 181, 139, 184, 177, 12, 115, 61, 165, 37, 140, 100, 157, 20, 150, 43, 117, 120, 48, 27, 121, 86, 96, 158, 72, 118, 93]);

var fs = require('fs');
// var txt = fs.readFileSync('IntegerArray.txt');

fs.readFile('./IntegerArray.txt', 'utf8', function read(err, data) {
    if (err) {
        throw err;
    }

    var content = data.split("\r\n");
    var a = MergeSort(content);




});