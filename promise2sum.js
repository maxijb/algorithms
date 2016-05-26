/// Dependencies
var fs = require('fs');
var extend = require("extend");

var a = new Promise(function(resolve, reject) {
		fs.readFile('./10.txt', 'utf8', function(error, data) {
			if (error) reject(error);
			else resolve(data);
		});	
	});	

var b = new Promise(function(resolve, reject) {
				fs.readFile('./100.txt', 'utf8', function(error, data) {
					if (error) reject(error);
					else resolve(data);
				});	
			});

Promise.race([a,b])
.then(function(data, data2) {
	console.log('success', data);
	
}, function(error) {
	console.log('erroraaaa', error);
})
.catch(function(err) {
	console.error(err);
});


//content = data.split("\n");

// console.log(content.length);
// var X = {};
// var num = 0;
// for (var i = 0; i  < content.length; i++) {
// 	var key = Math.floor(content[i] / 10000);
// 	console.log(i, num, key, content[i]);
// 	if (X.hasOwnProperty(key)) {
// 		X[key].push(content[i]);
// 	} else {
// 		num++;
// 		X[key] = [content[i]] ;
// 	}
// }


// console.log(Object.keys(X).length);

// //create buckets
// var buckets = {};
// for (var i = -10000; i < 10001; i++) {
//     buckets[i] = true;
// }

// //number of results computed
// var results = {};

// for (var i in Object.keys(buckets)) {
// 	for (var j )
// }

