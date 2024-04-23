import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_PAYMENT_DETAIL,
	DELETE_PAYMENT_DETAIL,
	GET_PAYMENT_DETAILS,
	GET_PAYMENT_DETAIL_BY_ID,
	UPDATE_PAYMENT_DETAIL
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PaymentDetailModel from './paymentDetail/models/PaymentDetailModel';

export const addTagTypes = ['paymentDetails'];
const PaymentDetailApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPaymentDetails: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PAYMENT_DETAILS, params: { page, size, searchKey } }),
				providesTags: ['paymentDetails']
			}),
			deletePaymentDetails: build.mutation({
				query: (paymentDetailIds) => ({
					url: ALL_USERS,
					method: 'DELETE',

					data: paymentDetailIds
				}),
				invalidatesTags: ['paymentDetails']
			}),
			getPaymentDetail: build.query({
				query: (paymentDetailId) => ({
					url: `${GET_PAYMENT_DETAIL_BY_ID}${paymentDetailId}`
				}),
				providesTags: ['paymentDetails']
			}),
			createPaymentDetail: build.mutation({
				query: (newPaymentDetail) => ({
					url: CREATE_PAYMENT_DETAIL,
					method: 'POST',
					data: jsonToFormData(PaymentDetailModel(newPaymentDetail))
				}),
				invalidatesTags: ['paymentDetails']
			}),
			updatePaymentDetail: build.mutation({
				query: (paymentDetail) => ({
					url: `${UPDATE_PAYMENT_DETAIL}${paymentDetail.id}`,
					method: 'PUT',
					data: jsonToFormData(paymentDetail)
				}),
				invalidatesTags: ['paymentDetails']
			}),
			deletePaymentDetail: build.mutation({
				query: (paymentDetailId) => ({
					url: `${DELETE_PAYMENT_DETAIL}${paymentDetailId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['paymentDetails']
			})
		}),
		overrideExisting: false
	});
export default PaymentDetailApi;
export const {
	useGetPaymentDetailsQuery,
	useDeletePaymentDetailsMutation,
	useGetPaymentDetailQuery,
	useUpdatePaymentDetailMutation,
	useDeletePaymentDetailMutation,

	useCreatePaymentDetailMutation
} = PaymentDetailApi;

export const selectFilteredPaymentDetails = (paymentDetails) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return paymentDetails;
		}

		return FuseUtils.filterArrayByString(paymentDetails, searchText);
	});
