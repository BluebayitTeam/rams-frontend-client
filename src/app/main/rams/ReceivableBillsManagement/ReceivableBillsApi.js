import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_RECEIVABLEBILL,
	DELETE_RECEIVABLEBILL,
	DELETE_RECEIVABLEBILL_MULTIPLE,
	GET_RECEIVABLEBILLS,
	GET_RECEIVABLEBILL_BY_INVOICE_NO,
	UPDATE_RECEIVABLEBILL
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ReceivableBillModel from './receivableBill/models/ReceivableBillModel';

export const addTagTypes = ['receivableBills'];
const ReceivableBillApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getReceivableBills: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_RECEIVABLEBILLS,
					params: { page, size, searchKey }
				}),
				providesTags: ['receivableBills']
			}),
			deleteReceivableBills: build.mutation({
				query: (receivableBillIds) => ({
					url: DELETE_RECEIVABLEBILL_MULTIPLE,
					method: 'DELETE',
					data: { ids: receivableBillIds }
				}),
				invalidatesTags: ['receivableBills']
			}),
			getReceivableBill: build.query({
				query: (receivableBillId) => ({
					url: `${GET_RECEIVABLEBILL_BY_INVOICE_NO}${receivableBillId}`
				}),
				providesTags: ['receivableBills']
			}),
			createReceivableBill: build.mutation({
				query: (newReceivableBill) => ({
					url: CREATE_RECEIVABLEBILL,
					method: 'POST',
					data: jsonToFormData(ReceivableBillModel(newReceivableBill))
				}),
				invalidatesTags: ['receivableBills']
			}),
			updateReceivableBill: build.mutation({
				query: (receivableBill) => ({
					url: `${UPDATE_RECEIVABLEBILL}`,
					method: 'PUT',
					data: jsonToFormData(receivableBill)
				}),
				invalidatesTags: ['receivableBills']
			}),
			deleteReceivableBill: build.mutation({
				query: (invoice_no) => ({
					url: `${DELETE_RECEIVABLEBILL}${invoice_no}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['receivableBills']
			})
		}),
		overrideExisting: false
	});
export default ReceivableBillApi;
export const {
	useGetReceivableBillsQuery,
	useDeleteReceivableBillsMutation,
	useGetReceivableBillQuery,
	useUpdateReceivableBillMutation,
	useDeleteReceivableBillMutation,

	useCreateReceivableBillMutation
} = ReceivableBillApi;

export const selectFilteredReceivableBills = (receivableBills) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return receivableBills;
		}

		return FuseUtils.filterArrayByString(receivableBills, searchText);
	});
