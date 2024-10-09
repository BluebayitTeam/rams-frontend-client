import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_CREDITOR_TOTAL_REPORT_DATA,
	GET_CREDITOR_TOTAL_REPORT_DATA_WITHOUT_PG,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['creditorReports'];
const CreditorReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCreditorReports: build.query({
				query: (filterData) => ({
					url: GET_CREDITOR_TOTAL_REPORT_DATA,
					params: filterData
				}),
				providesTags: ['creditorReports']
			}),
			getCreditorAllReports: build.query({
				query: (filterData) => ({
					url: GET_CREDITOR_TOTAL_REPORT_DATA_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['creditorReports']
			}),
			deleteCreditorReports: build.mutation({
				query: (creditorReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: creditorReportIds }
				}),
				invalidatesTags: ['creditorReports']
			}),
			getCreditorReport: build.query({
				query: (creditorReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${creditorReportId}`
				}),
				providesTags: ['creditorReports']
			}),
			createCreditorReport: build.mutation({
				query: (newCreditorReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newCreditorReport)
				}),
				invalidatesTags: ['creditorReports']
			}),
			updateCreditorReport: build.mutation({
				query: (creditorReport) => ({
					url: `${UPDATE_DEPARTMENT}${creditorReport.id}`,
					method: 'PUT',
					data: jsonToFormData(creditorReport)
				}),
				invalidatesTags: ['creditorReports']
			}),
			deleteCreditorReport: build.mutation({
				query: (creditorReportId) => ({
					url: `${DELETE_DEPARTMENT}${creditorReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['creditorReports']
			})
		}),
		overrideExisting: false
	});
export default CreditorReportApi;
export const {
	useGetCreditorReportsQuery,
	useGetCreditorAllReportsQuery,
	useDeleteCreditorReportsMutation,
	useGetCreditorReportQuery,
	useUpdateCreditorReportMutation,
	useDeleteCreditorReportMutation,
	useCreateCreditorReportMutation
} = CreditorReportApi;

export const selectFilteredCreditorReports = (creditorReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return creditorReports;
		}

		return FuseUtils.filterArrayByString(creditorReports, searchText);
	});
