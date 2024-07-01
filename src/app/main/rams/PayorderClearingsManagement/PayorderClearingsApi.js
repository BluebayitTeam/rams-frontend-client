import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_PAYORDER_CLEARING,
	DELETE_PAYORDER_CLEARING,
	DELETE_PAYORDER_CLEARING_MULTIPLE,
	GET_PAYORDER_CLEARINGS,
	GET_PAYORDER_CLEARING_BY_ID,
	UPDATE_PAYORDER_CLEARING
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PayorderClearingModel from './payorderClearing/models/PayorderClearingModel';

export const addTagTypes = ['payorderClearings'];
const PayorderClearingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayorderClearings: build.query({
				query: ({ page, size, searchKey, is_cheque = 'pay_order' }) => ({
					url: GET_PAYORDER_CLEARINGS,
					params: { page, size, searchKey, is_cheque }
				}),
				providesTags: ['payorderClearings']
			}),
			deletePayorderClearings: build.mutation({
				query: (payorderClearingIds) => ({
					url: DELETE_PAYORDER_CLEARING_MULTIPLE,
					method: 'DELETE',
					data: { ids: payorderClearingIds }
				}),
				invalidatesTags: ['payorderClearings']
			}),
			getPayorderClearing: build.query({
				query: (payorderClearingId) => ({
					url: `${GET_PAYORDER_CLEARING_BY_ID}${payorderClearingId}`
				}),
				providesTags: ['payorderClearings']
			}),
			createPayorderClearing: build.mutation({
				query: (newPayorderClearing) => ({
					url: CREATE_PAYORDER_CLEARING,
					method: 'POST',
					data: jsonToFormData(PayorderClearingModel(newPayorderClearing))
				}),
				invalidatesTags: ['payorderClearings']
			}),
			updatePayorderClearing: build.mutation({
				query: (payorderClearing) => ({
					url: `${UPDATE_PAYORDER_CLEARING}${payorderClearing.id}`,
					method: 'PUT',
					data: jsonToFormData(payorderClearing)
				}),
				invalidatesTags: ['payorderClearings']
			}),
			deletePayorderClearing: build.mutation({
				query: (payorderClearingId) => ({
					url: `${DELETE_PAYORDER_CLEARING}${payorderClearingId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['payorderClearings']
			})
		}),
		overrideExisting: false
	});
export default PayorderClearingApi;
export const {
	useGetPayorderClearingsQuery,
	useDeletePayorderClearingsMutation,
	useGetPayorderClearingQuery,
	useUpdatePayorderClearingMutation,
	useDeletePayorderClearingMutation,

	useCreatePayorderClearingMutation
} = PayorderClearingApi;

export const selectFilteredPayorderClearings = (payorderClearings) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return payorderClearings;
		}

		return FuseUtils.filterArrayByString(payorderClearings, searchText);
	});
