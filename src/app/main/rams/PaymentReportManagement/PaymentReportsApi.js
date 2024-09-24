import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	PAYMENT_FILTER_BY,
	PAYMENT_FILTER_WITHOUT_PG,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['paymentReports'];
const PaymentReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPaymentReports: build.query({
				query: (filterData) => ({
					url: PAYMENT_FILTER_BY,
					params: filterData
				}),
				providesTags: ['paymentReports']
			}),
			getPaymentAllReports: build.query({
				query: (filterData) => ({
					url: PAYMENT_FILTER_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['paymentReports']
			}),
			deletePaymentReports: build.mutation({
				query: (paymentReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: paymentReportIds }
				}),
				invalidatesTags: ['paymentReports']
			}),
			getPaymentReport: build.query({
				query: (paymentReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${paymentReportId}`
				}),
				providesTags: ['paymentReports']
			}),
			createPaymentReport: build.mutation({
				query: (newPaymentReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newPaymentReport)
				}),
				invalidatesTags: ['paymentReports']
			}),
			updatePaymentReport: build.mutation({
				query: (paymentReport) => ({
					url: `${UPDATE_DEPARTMENT}${paymentReport.id}`,
					method: 'PUT',
					data: jsonToFormData(paymentReport)
				}),
				invalidatesTags: ['paymentReports']
			}),
			deletePaymentReport: build.mutation({
				query: (paymentReportId) => ({
					url: `${DELETE_DEPARTMENT}${paymentReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['paymentReports']
			})
		}),
		overrideExisting: false
	});
export default PaymentReportApi;
export const {
	useGetPaymentReportsQuery,
	useGetPaymentAllReportsQuery,
	useDeletePaymentReportsMutation,
	useGetPaymentReportQuery,
	useUpdatePaymentReportMutation,
	useDeletePaymentReportMutation,
	useCreatePaymentReportMutation
} = PaymentReportApi;

export const selectFilteredPaymentReports = (paymentReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return paymentReports;
		}

		return FuseUtils.filterArrayByString(paymentReports, searchText);
	});
