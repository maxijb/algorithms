// var r = []; 
// for (var i = 0; i < 20; i++) {
  // r.push({x: (Math.random() * 1000)|0, y:(Math.random() * 1000)|0});
// } 
// 

var r = JSON.parse('[{"x":607,"y":814},{"x":879,"y":104},{"x":611,"y":401},{"x":945,"y":195},{"x":744,"y":686},{"x":148,"y":115},{"x":616,"y":113},{"x":735,"y":721},{"x":135,"y":699},{"x":929,"y":257},{"x":60,"y":228},{"x":528,"y":582},{"x":845,"y":764},{"x":839,"y":614},{"x":177,"y":815},{"x":198,"y":779},{"x":506,"y":440},{"x":510,"y":73},{"x":421,"y":426},{"x":956,"y":237}]');


function ClosestPair(points) {
	eval('debugger');
	var pointsX = points.slice().sort(function(a,b) { return a.x - b.x});
	var pointsY = points.slice().sort(function(a,b) { return a.y - b.y});

	return closestUtil(pointsX, pointsY);


	function closestUtil(px, py) {
		if (px.length <= 3) {
			return bruteForceDistance(px);
		}
			//half of length
		var mid = (px.length / 2) | 0;
			//left array ordered by X
		var pxL = px.slice(0,mid);
			//right array ordered by X
		var pxR = px.slice(mid);
			//max X value in the left column
		var maxPxL = pxL[mid - 1].x;
			//left points ordered by Y
		var pyL = py.filter(function(a) { return a.x <= maxPxL});
			//right points ordered by Y
		var pyR = py.filter(function(a) { return a.x > maxPxL});

			//get results from both lists
		var resultsLeft = closestUtil(pxL, pyL);
		var resultsRight = closestUtil(pxR, pyR);

			//best of both results
		var bestResults = resultsLeft.delta < resultsRight.delta ? resultsLeft : resultsRight;

			//points in the strip closer
		var strip = py.filter(function(a) { return Math.abs(a.x - maxPxL) < bestResults.delta });
			//get closest information within the strip
		var stripResults = stripClosest(strip, bestResults.delta);

		return stripResults && stripResults.delta < bestResults.delta ? stripResults : bestResults; 			

	}



	function stripClosest(strip, delta) {
		var maxIndex = strip.length - 1,
			minDistance = delta,
			bestPair = null,
			distance;

		for(var i=0; i < maxIndex - 1 ;i++ )
     	{
        	var maxJ = Math.min(7, maxIndex - i);
            for(j=i+1; j < maxJ; j++)
            {
            	if ((distance = euclideanDistance(strip[i], strip[j])) < minDistance) {
            		minDistance = distance;
            		bestPair = [strip[i], strip[j]];
            	}
            }
      	}

      	return bestPair ? {pair: bestPair, delta: minDistance} : null;
	}



	function bruteForceDistance(points) {
		var bestPair = null,
			minDistance = Infinity,
			distance;

		for (var i = 0; i < points.length - 1; i++) {
			for (var j = i+1; j < points.length; j++) {
				if ((distance = euclideanDistance(points[i], points[j])) < minDistance) {
					bestPair = [points[i], points[j]];
					minDistance = distance;
				}
			}
		}

		return bestPair ? {pair: bestPair, delta: minDistance} : null;
	}



	function euclideanDistance(p1, p2) {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	}



} 

ClosestPair(r);