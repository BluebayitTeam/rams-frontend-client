function fillUnderscoreBySpace(txt) {
	let ModifiedText = txt;
	try {
		let str = txt;
		const underScoreIndxs = [];
		const upperCaseIndxs = [0];
		const underScoreIndx = str.indexOf('_');

		const getMoreIndx = after => {
			const underScoreIndxMore = str.indexOf('_', after + 1);
			if (underScoreIndxMore >= 0) {
				underScoreIndxs.push(underScoreIndxMore);
				upperCaseIndxs.push(underScoreIndxMore + 1);
				getMoreIndx(underScoreIndxMore);
			}
		};

		if (underScoreIndx >= 0) {
			underScoreIndxs.push(underScoreIndx);
			upperCaseIndxs.push(underScoreIndx + 1);
			getMoreIndx(underScoreIndx);
		}

		str = str.split('');
		upperCaseIndxs.map(id => (str[id] = str[id].toUpperCase()));
		underScoreIndxs.map(id => (str[id] = ' '));
		ModifiedText = str.join('');
	} catch (err) {
		ModifiedText = txt;
	}

	return ModifiedText;
}

export default fillUnderscoreBySpace;
