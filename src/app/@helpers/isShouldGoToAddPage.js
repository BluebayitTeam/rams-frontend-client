const isShouldGoToAddPage = event => {
	return event.target.localName !== 'input';
};
export default isShouldGoToAddPage;
