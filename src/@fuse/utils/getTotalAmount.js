const getTotalAmount = (listArray = [], sumKey = '') => {
	let totalAmount = 0;

	if (Array.isArray(listArray)) {
		totalAmount = listArray.reduce((total, valueObj) => total + Number(valueObj[sumKey]), 0);
	}

	return totalAmount;
};

export default getTotalAmount;
