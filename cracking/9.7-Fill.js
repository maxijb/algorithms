function fill(bits, x, y, color) {
	var xmax = bits.length,
		ymax = bits[0].length,
		queue = [[x,y]],
		seen = {},
		origColor = bits[x][y],
		point;

	
	console.log(bits);

	while (point = queue.shift()) {
		
		let xx = point[0],
			yy = point[1],
			bit = xx >= 0 && xx < xmax && yy >= 0 && yy < ymax ? bits[xx][yy] : undefined;

		if (typeof bit !== "undefined" && bit == origColor && !seen[xx+'-'+yy]) {

			seen[xx+'-'+yy] = 1;
			bits[xx][yy] = color;

			queue.push([xx+1, yy]);
			queue.push([xx-1, yy]);
			queue.push([xx, yy+1]);
			queue.push([xx, yy-1]);

		}
	}

	console.log(bits);


}




var data = [
	[0,0,1,1,0,0],
	[0,1,1,1,1,0],
	[0,1,1,1,1,1],
	[0,1,1,1,1,0],
	[0,0,1,1,1,0],
	[0,0,1,1,0,0],
];

fill(data, 3, 3, 2);








