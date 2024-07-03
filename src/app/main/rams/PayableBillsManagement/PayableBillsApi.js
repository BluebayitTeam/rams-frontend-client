import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_PAYABLEBILL,
	DELETE_PAYABLEBILL,
	DELETE_PAYABLEBILL_MULTIPLE,
	GET_PAYABLEBILLS,
	GET_PAYABLEBILL_BY_INVOICE_NO,
	UPDATE_PAYABLEBILL
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PayableBillModel from './payableBill/models/PayableBillModel';

export const addTagTypes = ['payableBills'];
const PayableBillApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayableBills: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_PAYABLEBILLS,
					params: { page, size, searchKey }
				}),
				providesTags: ['payableBills']
			}),
			deletePayableBills: build.mutation({
				query: (payableBillIds) => ({
					url: DELETE_PAYABLEBILL_MULTIPLE,
					method: 'DELETE',
					data: { ids: payableBillIds }
				}),
				invalidatesTags: ['payableBills']
			}),
			getPayableBill: build.query({
				query: (payableBillId) => ({
					url: `${GET_PAYABLEBILL_BY_INVOICE_NO}${payableBillId}`
				}),
				providesTags: ['payableBills']
			}),
			createPayableBill: build.mutation({
				query: (newPayableBill) => ({
					url: CREATE_PAYABLEBILL,
					method: 'POST',
					data: jsonToFormData(PayableBillModel(newPayableBill))
				}),
				invalidatesTags: ['payableBills']
			}),
			updatePayableBill: build.mutation({
				query: (payableBill) => ({
					url: `${UPDATE_PAYABLEBILL}`,
					method: 'PUT',
					data: jsonToFormData(payableBill)
				}),
				invalidatesTags: ['payableBills']
			}),
			deletePayableBill: build.mutation({
				query: (invoice_no) => ({
					url: `${DELETE_PAYABLEBILL}${invoice_no}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['payableBills']
			})
		}),
		overrideExisting: false
	});
export default PayableBillApi;
export const {
	useGetPayableBillsQuery,
	useDeletePayableBillsMutation,
	useGetPayableBillQuery,
	useUpdatePayableBillMutation,
	useDeletePayableBillMutation,

	useCreatePayableBillMutation
} = PayableBillApi;

export const selectFilteredPayableBills = (payableBills) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return payableBills;
		}

		return FuseUtils.filterArrayByString(payableBills, searchText);
	});
