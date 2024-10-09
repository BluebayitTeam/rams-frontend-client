import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEBTOR_TOTAL_REPORT_DATA,
	GET_DEBTOR_TOTAL_REPORT_DATA_WITHOUT_PG,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['drebtorReports'];
const DrebtorReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDrebtorReports: build.query({
				query: (filterData) => ({
					url: GET_DEBTOR_TOTAL_REPORT_DATA,
					params: filterData
				}),
				providesTags: ['drebtorReports']
			}),
			getDrebtorAllReports: build.query({
				query: (filterData) => ({
					url: GET_DEBTOR_TOTAL_REPORT_DATA_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['drebtorReports']
			}),
			deleteDrebtorReports: build.mutation({
				query: (drebtorReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: drebtorReportIds }
				}),
				invalidatesTags: ['drebtorReports']
			}),
			getDrebtorReport: build.query({
				query: (drebtorReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${drebtorReportId}`
				}),
				providesTags: ['drebtorReports']
			}),
			createDrebtorReport: build.mutation({
				query: (newDrebtorReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newDrebtorReport)
				}),
				invalidatesTags: ['drebtorReports']
			}),
			updateDrebtorReport: build.mutation({
				query: (drebtorReport) => ({
					url: `${UPDATE_DEPARTMENT}${drebtorReport.id}`,
					method: 'PUT',
					data: jsonToFormData(drebtorReport)
				}),
				invalidatesTags: ['drebtorReports']
			}),
			deleteDrebtorReport: build.mutation({
				query: (drebtorReportId) => ({
					url: `${DELETE_DEPARTMENT}${drebtorReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['drebtorReports']
			})
		}),
		overrideExisting: false
	});
export default DrebtorReportApi;
export const {
	useGetDrebtorReportsQuery,
	useGetDrebtorAllReportsQuery,
	useDeleteDrebtorReportsMutation,
	useGetDrebtorReportQuery,
	useUpdateDrebtorReportMutation,
	useDeleteDrebtorReportMutation,
	useCreateDrebtorReportMutation
} = DrebtorReportApi;

export const selectFilteredDrebtorReports = (drebtorReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return drebtorReports;
		}

		return FuseUtils.filterArrayByString(drebtorReports, searchText);
	});
