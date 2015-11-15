function disambiguateTagsLabels(tags)  {

		let labels = {};

		tags.map((tag, index) => {
			if (tag.name) {
				let label = tag.name.substr(0,1).toUpperCase();
				debugger;
				if (!labels[label]) {
					labels[label] = index;
				} else {
					disambiguate(labels[label], index);
				}
			}
		});

		for (let i in labels) {
			tags[labels[i]].label = i;
		}

		return tags;

		function disambiguate(a, b) {
			let lenA = tags[a].name.length,
				lenB = tags[b].name.length,
				maxLen = lenA == lenB ? lenB : Math.min(lenA, lenB) + 1;

			let keyA = "", keyB = "";
			for (let i = 0; i < maxLen; i++) {
				keyA += tags[a].name.substr(i, 1);
				keyB += tags[b].name.substr(i, 1);
				
				if (i == 0) { 
					keyA = keyA.toUpperCase(); 
					keyB = keyB.toUpperCase()
				}

				if (keyB != keyA) {
					labels[keyA] = a;
					labels[keyB] = b;
					break;
				}
			}
		}
	}




let data = [
	{name: ""},
	{name: "frontend"},
	{name: "front"},
	{name: "back"},
	{name: "cooperative"},
	{name: "books"}
];


console.log(disambiguateTagsLabels(data));