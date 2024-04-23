const getPaginationData = (dataArr = [], size = 25, page = 1) => {
	let totalPages = 0;
	let totalElements = 0;

	if (Array.isArray(dataArr)) {
		totalPages = isNaN(dataArr.length / size) ? 0 : Math.ceil(dataArr.length / size);
		totalElements = dataArr.length || 0;
	}

	return { page, size, totalPages, totalElements };
};

export default getPaginationData;
