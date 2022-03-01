import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_MAKEALIST_REPORT_BY_ID, GET_MAKEALIST_REPORT_BY_ID_NO_PG } from '../../../../../constant/constants';
import { columns } from '../data/column';

export const getMakeAListReports = createAsyncThunk(
	'makeAListsManagement/makeAListTableClms/getMakeAListReports',
	async ({ listId, pageAndSize }, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.get(`${GET_MAKEALIST_REPORT_BY_ID}${listId}`, { params: pageAndSize });
			const data = (await response.data) || {};

			const oneList = data?.make_list_items?.[0];
			const tableColumns = [{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true }];
			for (let mainkey in oneList) {
				for (let subKey in oneList[mainkey]) {
					const targetedClmData = columns.find(clm => clm.key === `${subKey}_${mainkey}`);
					if (targetedClmData) {
						tableColumns.push({
							id: targetedClmData?.id,
							label: targetedClmData?.label,
							name: mainkey,
							subName: subKey,
							type: targetedClmData.type,
							show: true
						});
					}
				}
			}
			dispatch(setColums(tableColumns));

			return data;
		} catch (err) {
			return rejectWithValue();
		}
	}
);

export const getAllMakeAListReports = createAsyncThunk(
	'makeAListsManagement/makeAListTableClms/getAllMakeAListReports',
	async ({ listId }, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.get(`${GET_MAKEALIST_REPORT_BY_ID_NO_PG}${listId}`);
			const data = (await response.data?.make_list_items) || [];

			const oneList = data?.[0];
			const tableColumns = [{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true }];
			for (let mainkey in oneList) {
				for (let subKey in oneList[mainkey]) {
					const targetedClmData = columns.find(clm => clm.key === `${subKey}_${mainkey}`);
					if (targetedClmData) {
						tableColumns.push({
							id: targetedClmData?.id,
							label: targetedClmData?.label,
							name: mainkey,
							subName: subKey,
							type: targetedClmData.type,
							show: true
						});
					}
				}
			}
			dispatch(setColums(tableColumns));

			return data;
		} catch (err) {
			return rejectWithValue();
		}
	}
);

const makeAListReportsSlice = createSlice({
	name: 'makeAListsManagement/makeAListTableClms',
	initialState: [{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true }],
	reducers: {
		resetMakeAListReports: () => [{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true }],
		setColums: (state, action) => action.payload
	}
});

export const { setColums, resetMakeAListReports } = makeAListReportsSlice.actions;

export default makeAListReportsSlice.reducer;
