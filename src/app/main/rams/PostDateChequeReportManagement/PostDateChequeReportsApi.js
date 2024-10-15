import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	POSTDATE_FILTER_BY,
	POSTDATE_FILTER_WITHOUT_PG
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['postDateChequeReports'];
const PostDateChequeReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPostDateChequeReports: build.query({
				query: (filterData) => ({
					url: POSTDATE_FILTER_BY,
					params: filterData
				}),
				providesTags: ['postDateChequeReports']
			}),
			getPostDateChequeAllReports: build.query({
				query: (filterData) => ({
					url: POSTDATE_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['postDateChequeReports']
			}),
			
			}),
		overrideExisting: false
	});
export default PostDateChequeReportApi;
export const {
	useGetPostDateChequeReportsQuery,
	useGetPostDateChequeAllReportsQuery,
	
} = PostDateChequeReportApi;

export const selectFilteredPostDateChequeReports = (postDateChequeReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return postDateChequeReports;
		}

		return FuseUtils.filterArrayByString(postDateChequeReports, searchText);
	});
