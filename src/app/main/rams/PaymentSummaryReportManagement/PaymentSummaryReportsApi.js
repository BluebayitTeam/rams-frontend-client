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

export const addTagTypes = ['paymentSummaryReports'];
const PaymentSummaryReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPaymentSummaryReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['paymentSummaryReports']
			}),
			getPaymentSummaryAllReports: build.query({
				query: (filterData) => ({
					url: RECEIPT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['paymentSummaryReports']
			}),
			deletePaymentSummaryReports: build.mutation({
				query: (paymentSummaryReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: paymentSummaryReportIds }
				}),
				invalidatesTags: ['paymentSummaryReports']
			}),
			getPaymentSummaryReport: build.query({
				query: (paymentSummaryReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${paymentSummaryReportId}`
				}),
				providesTags: ['paymentSummaryReports']
			}),
			createPaymentSummaryReport: build.mutation({
				query: (newPaymentSummaryReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newPaymentSummaryReport)
				}),
				invalidatesTags: ['paymentSummaryReports']
			}),
			updatePaymentSummaryReport: build.mutation({
				query: (paymentSummaryReport) => ({
					url: `${UPDATE_DEPARTMENT}${paymentSummaryReport.id}`,
					method: 'PUT',
					data: jsonToFormData(paymentSummaryReport)
				}),
				invalidatesTags: ['paymentSummaryReports']
			}),
			deletePaymentSummaryReport: build.mutation({
				query: (paymentSummaryReportId) => ({
					url: `${DELETE_DEPARTMENT}${paymentSummaryReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['paymentSummaryReports']
			})
		}),
		overrideExisting: false
	});
export default PaymentSummaryReportApi;
export const {
	useGetPaymentSummaryReportsQuery,
	useGetPaymentSummaryAllReportsQuery,
	useDeletePaymentSummaryReportsMutation,
	useGetPaymentSummaryReportQuery,
	useUpdatePaymentSummaryReportMutation,
	useDeletePaymentSummaryReportMutation,
	useCreatePaymentSummaryReportMutation
} = PaymentSummaryReportApi;

export const selectFilteredPaymentSummaryReports = (paymentSummaryReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return paymentSummaryReports;
		}

		return FuseUtils.filterArrayByString(paymentSummaryReports, searchText);
	});
