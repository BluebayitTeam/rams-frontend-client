import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	RECEIPT_SUMMARY_FILTER_BY,
	RECEIPT_SUMMARY_FILTER_WITHOUT_PG,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['receiptSummaryReports'];
const ReceiptSummaryReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getReceiptSummaryReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_SUMMARY_FILTER_BY,
					params: filterData
				}),
				providesTags: ['receiptSummaryReports']
			}),
			getReceiptSummaryAllReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_SUMMARY_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['receiptSummaryReports']
			}),
			deleteReceiptSummaryReports: build.mutation({
				query: (receiptSummaryReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: receiptSummaryReportIds }
				}),
				invalidatesTags: ['receiptSummaryReports']
			}),
			getReceiptSummaryReport: build.query({
				query: (receiptSummaryReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${receiptSummaryReportId}`
				}),
				providesTags: ['receiptSummaryReports']
			}),
			createReceiptSummaryReport: build.mutation({
				query: (newReceiptSummaryReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newReceiptSummaryReport)
				}),
				invalidatesTags: ['receiptSummaryReports']
			}),
			updateReceiptSummaryReport: build.mutation({
				query: (receiptSummaryReport) => ({
					url: `${UPDATE_DEPARTMENT}${receiptSummaryReport.id}`,
					method: 'PUT',
					data: jsonToFormData(receiptSummaryReport)
				}),
				invalidatesTags: ['receiptSummaryReports']
			}),
			deleteReceiptSummaryReport: build.mutation({
				query: (receiptSummaryReportId) => ({
					url: `${DELETE_DEPARTMENT}${receiptSummaryReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['receiptSummaryReports']
			})
		}),
		overrideExisting: false
	});
export default ReceiptSummaryReportApi;
export const {
	useGetReceiptSummaryReportsQuery,
	useGetReceiptSummaryAllReportsQuery,
	useDeleteReceiptSummaryReportsMutation,
	useGetReceiptSummaryReportQuery,
	useUpdateReceiptSummaryReportMutation,
	useDeleteReceiptSummaryReportMutation,
	useCreateReceiptSummaryReportMutation
} = ReceiptSummaryReportApi;

export const selectFilteredReceiptSummaryReports = (receiptSummaryReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return receiptSummaryReports;
		}

		return FuseUtils.filterArrayByString(receiptSummaryReports, searchText);
	});
