const isShouldFormSave = event => {
	console.log(event);
	return event.srcElement.ariaAutoComplete !== 'list';
};
export default isShouldFormSave;
