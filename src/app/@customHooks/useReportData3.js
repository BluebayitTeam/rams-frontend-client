import _ from 'lodash';
import { useEffect, useState } from 'react';

const useReportData3 = ({ initialData = [], row = 25, extraRowCount = 0 } = {}) => {
	const [orginalArray, setOrginalArray] = useState([]);
	const [data, setData] = useState([]);
	const [sortBy, setSortBy] = useState('');
	const [sortBySubKey, setSortBySubKey] = useState('name');

	const modifyData = (orginalArr, size = row) => {
		if (_.isArray(orginalArr)) {
			setOrginalArray(orginalArr);

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
					data: shortedArray.slice(
						index + index * size - (index && index),
						index + index * size + size - (index && index)
					)
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

	const dragAndDropRow = (draggerId, droperId) => {
		const newState = [...orginalArray];

		const dropperIndex = droperId;
		const draggerIndex = parseInt(draggerId);

		console.log({ dropperIndex, draggerIndex });

		if ((dropperIndex == 0 || dropperIndex) && (draggerIndex == 0 || draggerIndex)) {
			if (dropperIndex < draggerIndex) {
				newState.splice(dropperIndex, 0, newState[draggerIndex]);
				newState.splice(draggerIndex + 1, 1);
				modifyData(newState);
			} else if (dropperIndex > draggerIndex) {
				newState.splice(dropperIndex + 1, 0, newState[draggerIndex]);
				newState.splice(draggerIndex, 1);
				modifyData(newState);
			}
		}
	};

	console.log('rendered usereportdata');
	return [data, modifyData, setSortBy, setSortBySubKey, dragAndDropRow];
};

export default useReportData3;
