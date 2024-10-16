import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	POSTDATE_FILTER_BY,
	POSTDATE_FILTER_WITHOUT_PG
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['payorderClearingReports'];
const PayorderClearingReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayorderClearingReports: build.query({
				query: (filterData) => ({
					url: POSTDATE_FILTER_BY,
					params: filterData
				}),
				providesTags: ['payorderClearingReports']
			}),
			getPayorderClearingAllReports: build.query({
				query: (filterData) => ({
					url: POSTDATE_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['payorderClearingReports']
			}),
			
			}),
		overrideExisting: false
	});
export default PayorderClearingReportApi;
export const {
	useGetPayorderClearingReportsQuery,
	useGetPayorderClearingAllReportsQuery,
	
} = PayorderClearingReportApi;

export const selectFilteredPayorderClearingReports = (payorderClearingReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return payorderClearingReports;
		}

		return FuseUtils.filterArrayByString(payorderClearingReports, searchText);
	});
