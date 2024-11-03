import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	ACCOUNTSTATEMENT_FILTER_BY,
	ACCOUNTSTATEMENT_FILTER_WITHOUT_PG,
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['accountStatementReports'];
const AccountStatementReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAccountStatementReports: build.query({
				query: (filterData) => ({
					url: ACCOUNTSTATEMENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['accountStatementReports']
			}),
			getAccountStatementAllReports: build.query({
				query: (filterData) => ({
					url: ACCOUNTSTATEMENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['accountStatementReports']
			}),
			deleteAccountStatementReports: build.mutation({
				query: (accountStatementReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: accountStatementReportIds }
				}),
				invalidatesTags: ['accountStatementReports']
			}),
			getAccountStatementReport: build.query({
				query: (accountStatementReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${accountStatementReportId}`
				}),
				providesTags: ['accountStatementReports']
			}),
			createAccountStatementReport: build.mutation({
				query: (newAccountStatementReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newAccountStatementReport)
				}),
				invalidatesTags: ['accountStatementReports']
			}),
			updateAccountStatementReport: build.mutation({
				query: (accountStatementReport) => ({
					url: `${UPDATE_DEPARTMENT}${accountStatementReport.id}`,
					method: 'PUT',
					data: jsonToFormData(accountStatementReport)
				}),
				invalidatesTags: ['accountStatementReports']
			}),
			deleteAccountStatementReport: build.mutation({
				query: (accountStatementReportId) => ({
					url: `${DELETE_DEPARTMENT}${accountStatementReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['accountStatementReports']
			})
		}),
		overrideExisting: false
	});
export default AccountStatementReportApi;
export const {
	useGetAccountStatementReportsQuery,
	useGetAccountStatementAllReportsQuery,
	useDeleteAccountStatementReportsMutation,
	useGetAccountStatementReportQuery,
	useUpdateAccountStatementReportMutation,
	useDeleteAccountStatementReportMutation,
	useCreateAccountStatementReportMutation
} = AccountStatementReportApi;

export const selectFilteredAccountStatementReports = (accountStatementReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return accountStatementReports;
		}

		return FuseUtils.filterArrayByString(accountStatementReports, searchText);
	});
