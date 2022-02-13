import _ from 'lodash';
import { useEffect, useState } from 'react';

const useReportData2 = ({ initialData = [], row = 25, extraRowCount = 0, type } = {}) => {
	const [orginalArray, setOrginalArray] = useState([]);
	const [data, setData] = useState([]);
	const [sortBy, setSortBy] = useState('');
	const [sortBySubKey, setSortBySubKey] = useState('name');
	const [openingBalance, setOpeningBalance] = useState(0);

	const modifyData = (orginalArr, size = row, openingBlnc = openingBalance) => {
		if (_.isArray(orginalArr)) {
			setOrginalArray(orginalArr);
			setOpeningBalance(openingBlnc);

			let shortedArray = orginalArr;

			//short array if required
			if (sortBy) {
				console.log('sortBy', sortBy);
				console.log('orginalArray', orginalArray);
				shortedArray = _.sortBy(shortedArray, [
					o => (_.isObject(o[sortBy]) ? o[sortBy][sortBySubKey] || null : o[sortBy] || null)
				]);
			}

			//modify array
			let modifiedArr = [];

			const lotalElements = shortedArray?.length;

			const countTotalPage = Math.ceil((lotalElements ? lotalElements + extraRowCount : 0) / size);
			const totalPage = isNaN(countTotalPage) ? 0 : countTotalPage;

			for (let index = 0; index < totalPage; index++) {
				modifiedArr.push({
					page: index + 1,
					size,
					totalPage,
					sortBy,
					openingBlnc,
					isFirsPage: index === 0 || false,
					isLastPage: index + 1 === totalPage || false,
					get data() {
						const slicedArr = shortedArray.slice(
							index + index * size - (index && index),
							index + index * size + size - (index && index)
						);
						const modifiedArr = [];
						let balance = openingBlnc;
						slicedArr.map(dataObj => {
							balance +=
								type === 'ledger'
									? Number(dataObj.credit_amount) || -Number(dataObj.debit_amount) || 0
									: Number(dataObj.debit_amount) || -Number(dataObj.credit_amount) || 0;
							modifiedArr.push({ ...dataObj, balance: balance ? balance.toFixed(2) : '0.00' });
						});
						return modifiedArr;
					}
				});
			}

			setData(modifiedArr);
		}
	};

	useEffect(() => {
		modifyData(initialData, row);
	}, []);

	useEffect(() => {
		modifyData(orginalArray);
	}, [sortBy]);

	return [data, modifyData, setSortBy, setSortBySubKey];
};

export default useReportData2;
