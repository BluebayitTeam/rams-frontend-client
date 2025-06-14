const buildFormData = (formData, data, parentKey) => {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach((key) => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		// eslint-disable-next-line no-nested-ternary
		const value = data === null ? '' : data === undefined ? '' : data;

		formData.append(parentKey, value);
	}
};

function jsonToFormData(data) {
	const formData = new FormData();

	buildFormData(formData, data);
	return formData;
}

export default jsonToFormData;
