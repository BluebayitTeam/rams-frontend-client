const isShouldFormUpdate = event => {
	return event.srcElement.ariaAutoComplete !== 'list';
};

export default isShouldFormUpdate;
