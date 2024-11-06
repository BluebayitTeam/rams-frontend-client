import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	RECEIPT_FILTER_BY,
	RECEIPT_FILTER_WITHOUT_PG,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['receiptReports'];
const ReceiptReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getReceiptReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['receiptReports']
			}),
			getReceiptAllReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['receiptReports']
			}),
			deleteReceiptReports: build.mutation({
				query: (receiptReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: receiptReportIds }
				}),
				invalidatesTags: ['receiptReports']
			}),
			getReceiptReport: build.query({
				query: (receiptReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${receiptReportId}`
				}),
				providesTags: ['receiptReports']
			}),
			createReceiptReport: build.mutation({
				query: (newReceiptReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newReceiptReport)
				}),
				invalidatesTags: ['receiptReports']
			}),
			updateReceiptReport: build.mutation({
				query: (receiptReport) => ({
					url: `${UPDATE_DEPARTMENT}${receiptReport.id}`,
					method: 'PUT',
					data: jsonToFormData(receiptReport)
				}),
				invalidatesTags: ['receiptReports']
			}),
			deleteReceiptReport: build.mutation({
				query: (receiptReportId) => ({
					url: `${DELETE_DEPARTMENT}${receiptReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['receiptReports']
			})
		}),
		overrideExisting: false
	});
export default ReceiptReportApi;
export const {
	useGetReceiptReportsQuery,
	useGetReceiptAllReportsQuery,
	useDeleteReceiptReportsMutation,
	useGetReceiptReportQuery,
	useUpdateReceiptReportMutation,
	useDeleteReceiptReportMutation,
	useCreateReceiptReportMutation
} = ReceiptReportApi;

export const selectFilteredReceiptReports = (receiptReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return receiptReports;
		}

		return FuseUtils.filterArrayByString(receiptReports, searchText);
	});
