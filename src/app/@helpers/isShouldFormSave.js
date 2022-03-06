const isShouldFormSave = event => {
	return event.srcElement.ariaAutoComplete !== 'list' && event.srcElement.localName !== 'textarea';
};
export default isShouldFormSave;
