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

export const addTagTypes = ['accountSummaryReports'];
const AccountSummaryReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAccountSummaryReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['accountSummaryReports']
			}),
			getAccountSummaryAllReports: build.query({
				query: (filterData) => ({
					url: AGENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['accountSummaryReports']
			}),
			deleteAccountSummaryReports: build.mutation({
				query: (accountSummaryReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: accountSummaryReportIds }
				}),
				invalidatesTags: ['accountSummaryReports']
			}),
			getAccountSummaryReport: build.query({
				query: (accountSummaryReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${accountSummaryReportId}`
				}),
				providesTags: ['accountSummaryReports']
			}),
			createAccountSummaryReport: build.mutation({
				query: (newAccountSummaryReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newAccountSummaryReport)
				}),
				invalidatesTags: ['accountSummaryReports']
			}),
			updateAccountSummaryReport: build.mutation({
				query: (accountSummaryReport) => ({
					url: `${UPDATE_DEPARTMENT}${accountSummaryReport.id}`,
					method: 'PUT',
					data: jsonToFormData(accountSummaryReport)
				}),
				invalidatesTags: ['accountSummaryReports']
			}),
			deleteAccountSummaryReport: build.mutation({
				query: (accountSummaryReportId) => ({
					url: `${DELETE_DEPARTMENT}${accountSummaryReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['accountSummaryReports']
			})
		}),
		overrideExisting: false
	});
export default AccountSummaryReportApi;
export const {
	useGetAccountSummaryReportsQuery,
	useGetAccountSummaryAllReportsQuery,
	useDeleteAccountSummaryReportsMutation,
	useGetAccountSummaryReportQuery,
	useUpdateAccountSummaryReportMutation,
	useDeleteAccountSummaryReportMutation,
	useCreateAccountSummaryReportMutation
} = AccountSummaryReportApi;

export const selectFilteredAccountSummaryReports = (accountSummaryReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return accountSummaryReports;
		}

		return FuseUtils.filterArrayByString(accountSummaryReports, searchText);
	});
