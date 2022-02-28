function fillUnderscoreBySpace(txt) {
	let ModiFiedText = txt;
	try {
		let str = txt;
		const upperCaseArr = [0];
		const underScoreArr = [];
		const underScoreIndx = str.indexOf('_');

		const getMoreIndx = after => {
			const underScoreIndxMore = str.indexOf('_', after + 1);
			if (underScoreIndxMore >= 0) {
				upperCaseArr.push(underScoreIndxMore + 1);
				getMoreIndx(underScoreIndx);
			}
		};

		if (underScoreIndx >= 0) {
			upperCaseArr.push(underScoreIndx + 1);
			getMoreIndx(underScoreIndx);
		}

		str = str.split('');
		upperCaseArr.map(id => (str[id] = str[id].toUpperCase()));
		ModiFiedText = str.join('').replace('_', ' ');
	} catch (err) {
		ModiFiedText = txt;
	}

	return ModiFiedText;
}

export default fillUnderscoreBySpace;
