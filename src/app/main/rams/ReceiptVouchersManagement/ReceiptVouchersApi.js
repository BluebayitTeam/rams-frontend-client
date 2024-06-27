import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_RECEIPTVOUCHER,
	DELETE_RECEIPTVOUCHER,
	DELETE_RECEIPTVOUCHER_MULTIPLE,
	GET_RECEIPTVOUCHERS,
	GET_RECEIPT_VOUCHER_BY_INVOICE_NO,
	UPDATE_RECEIPTVOUCHER
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ReceiptVoucherModel from './receiptVoucher/models/ReceiptVoucherModel';

export const addTagTypes = ['receiptVouchers'];
const ReceiptVoucherApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getReceiptVouchers: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_RECEIPTVOUCHERS,
					params: { page, size, searchKey }
				}),
				providesTags: ['receiptVouchers']
			}),
			deleteReceiptVouchers: build.mutation({
				query: (receiptVoucherIds) => ({
					url: DELETE_RECEIPTVOUCHER_MULTIPLE,
					method: 'DELETE',
					data: { ids: receiptVoucherIds }
				}),
				invalidatesTags: ['receiptVouchers']
			}),
			getReceiptVoucher: build.query({
				query: (receiptVoucherId) => ({
					url: `${GET_RECEIPT_VOUCHER_BY_INVOICE_NO}${receiptVoucherId}`
				}),
				providesTags: ['receiptVouchers']
			}),
			createReceiptVoucher: build.mutation({
				query: (newReceiptVoucher) => ({
					url: CREATE_RECEIPTVOUCHER,
					method: 'POST',
					data: jsonToFormData(ReceiptVoucherModel(newReceiptVoucher))
				}),
				invalidatesTags: ['receiptVouchers']
			}),
			updateReceiptVoucher: build.mutation({
				query: (receiptVoucher) => ({
					url: `${UPDATE_RECEIPTVOUCHER}`,
					method: 'PUT',
					data: jsonToFormData(receiptVoucher)
				}),
				invalidatesTags: ['receiptVouchers']
			}),
			deleteReceiptVoucher: build.mutation({
				query: (receiptVoucherId) => ({
					url: `${DELETE_RECEIPTVOUCHER}${receiptVoucherId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['receiptVouchers']
			})
		}),
		overrideExisting: false
	});
export default ReceiptVoucherApi;
export const {
	useGetReceiptVouchersQuery,
	useDeleteReceiptVouchersMutation,
	useGetReceiptVoucherQuery,
	useUpdateReceiptVoucherMutation,
	useDeleteReceiptVoucherMutation,

	useCreateReceiptVoucherMutation
} = ReceiptVoucherApi;

export const selectFilteredReceiptVouchers = (receiptVouchers) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return receiptVouchers;
		}

		return FuseUtils.filterArrayByString(receiptVouchers, searchText);
	});
