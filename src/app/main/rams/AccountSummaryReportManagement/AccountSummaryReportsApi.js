import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	ACCOUNTSUMMARY_FILTER_BY,
	ACCOUNTSUMMARY_FILTER_WITHOUT_PG,
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
					url: ACCOUNTSUMMARY_FILTER_BY,
					params: filterData
				}),
				providesTags: ['accountSummaryReports']
			}),
			getAccountSummaryAllReports: build.query({
				query: (filterData) => ({
					url: ACCOUNTSUMMARY_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['accountSummaryReports']
			}),
			
			}),
		overrideExisting: false
	});
export default AccountSummaryReportApi;
export const {
	useGetAccountSummaryReportsQuery,
	useGetAccountSummaryAllReportsQuery,
	
} = AccountSummaryReportApi;

export const selectFilteredAccountSummaryReports = (accountSummaryReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return accountSummaryReports;
		}

		return FuseUtils.filterArrayByString(accountSummaryReports, searchText);
	});
