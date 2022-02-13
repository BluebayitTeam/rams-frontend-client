function fillUnderscoreBySpace(txt) {
	let ModiFiedText = txt;
	try {
		let str = txt;
		const arr = [0];
		const underScoreIndx = str.indexOf('_');
		underScoreIndx > 0 && arr.push(underScoreIndx + 1);

		str = str.split('');
		arr.map(id => (str[id] = str[id].toUpperCase()));
		ModiFiedText = str.join('').replace('_', ' ');
	} catch (err) {
		ModiFiedText = txt;
	}

	return ModiFiedText;
}

export default fillUnderscoreBySpace;
