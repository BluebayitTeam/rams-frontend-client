import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_PAYMENTVOUCHER,
	DELETE_PAYMENTVOUCHER,
	DELETE_PAYMENTVOUCHER_MULTIPLE,
	GET_PAYMENTVOUCHERS,
	GET_PAYMENT_VOUCHER_BY_INVOICE_NO,
	UPDATE_PAYMENTVOUCHER
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PaymentVoucherModel from './paymentVoucher/models/PaymentVoucherModel';

export const addTagTypes = ['paymentVouchers'];
const PaymentVoucherApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPaymentVouchers: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_PAYMENTVOUCHERS,
					params: { page, size, searchKey }
				}),
				providesTags: ['paymentVouchers']
			}),
			deletePaymentVouchers: build.mutation({
				query: (paymentVoucherIds) => ({
					url: DELETE_PAYMENTVOUCHER_MULTIPLE,
					method: 'DELETE',
					data: { ids: paymentVoucherIds }
				}),
				invalidatesTags: ['paymentVouchers']
			}),
			getPaymentVoucher: build.query({
				query: (paymentVoucherId) => ({
					url: `${GET_PAYMENT_VOUCHER_BY_INVOICE_NO}${paymentVoucherId}`
				}),
				providesTags: ['paymentVouchers']
			}),
			createPaymentVoucher: build.mutation({
				query: (newPaymentVoucher) => ({
					url: CREATE_PAYMENTVOUCHER,
					method: 'POST',
					data: jsonToFormData(PaymentVoucherModel(newPaymentVoucher))
				}),
				invalidatesTags: ['paymentVouchers']
			}),
			updatePaymentVoucher: build.mutation({
				query: (paymentVoucher) => ({
					url: `${UPDATE_PAYMENTVOUCHER}`,
					method: 'PUT',
					data: jsonToFormData(paymentVoucher)
				}),
				invalidatesTags: ['paymentVouchers']
			}),
			deletePaymentVoucher: build.mutation({
				query: (paymentVoucherId) => ({
					url: `${DELETE_PAYMENTVOUCHER}${paymentVoucherId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['paymentVouchers']
			})
		}),
		overrideExisting: false
	});
export default PaymentVoucherApi;
export const {
	useGetPaymentVouchersQuery,
	useDeletePaymentVouchersMutation,
	useGetPaymentVoucherQuery,
	useUpdatePaymentVoucherMutation,
	useDeletePaymentVoucherMutation,

	useCreatePaymentVoucherMutation
} = PaymentVoucherApi;

export const selectFilteredPaymentVouchers = (paymentVouchers) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return paymentVouchers;
		}

		return FuseUtils.filterArrayByString(paymentVouchers, searchText);
	});
