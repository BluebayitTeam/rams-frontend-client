const getPaginationData = (dataArr = [], size = 0) => {
	let page = 1;
	let totalPages = 0;
	let totalElements = 0;

	if (Array.isArray(dataArr)) {
		page = dataArr.length || 1;
		totalPages = isNaN(dataArr.length / size) ? 0 : Math.ceil(dataArr.length / size);
		totalElements = dataArr.length || 0;
	}

	console.log({ page, size, totalPages, totalElements });

	return { page, size, totalPages, totalElements };
};

export default getPaginationData;
