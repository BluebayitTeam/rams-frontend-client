const isShouldGoAddPage = event => {
	return event.target.localName !== 'input';
};
export default isShouldGoAddPage;
