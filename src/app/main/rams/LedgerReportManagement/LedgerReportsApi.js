import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	AGENT_FILTER_BY,
	AGENT_FILTER_WITHOUT_PG,
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ledgerReports'];
const LedgerReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getLedgerReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['ledgerReports']
			}),
			getLedgerAllReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['ledgerReports']
			}),
			deleteLedgerReports: build.mutation({
				query: (ledgerReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: ledgerReportIds }
				}),
				invalidatesTags: ['ledgerReports']
			}),
			getLedgerReport: build.query({
				query: (ledgerReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${ledgerReportId}`
				}),
				providesTags: ['ledgerReports']
			}),
			createLedgerReport: build.mutation({
				query: (newLedgerReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newLedgerReport)
				}),
				invalidatesTags: ['ledgerReports']
			}),
			updateLedgerReport: build.mutation({
				query: (ledgerReport) => ({
					url: `${UPDATE_DEPARTMENT}${ledgerReport.id}`,
					method: 'PUT',
					data: jsonToFormData(ledgerReport)
				}),
				invalidatesTags: ['ledgerReports']
			}),
			deleteLedgerReport: build.mutation({
				query: (ledgerReportId) => ({
					url: `${DELETE_DEPARTMENT}${ledgerReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ledgerReports']
			})
		}),
		overrideExisting: false
	});
export default LedgerReportApi;
export const {
	useGetLedgerReportsQuery,
	useGetLedgerAllReportsQuery,
	useDeleteLedgerReportsMutation,
	useGetLedgerReportQuery,
	useUpdateLedgerReportMutation,
	useDeleteLedgerReportMutation,
	useCreateLedgerReportMutation
} = LedgerReportApi;

export const selectFilteredLedgerReports = (ledgerReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ledgerReports;
		}

		return FuseUtils.filterArrayByString(ledgerReports, searchText);
	});
