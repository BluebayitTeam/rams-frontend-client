import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_PAY_HEAD,
	DELETE_PAY_HEAD,
	DELETE_PAY_HEAD_MULTIPLE,
	GET_PAY_HEADS,
	GET_PAY_HEAD_BY_ID,
	UPDATE_PAY_HEAD
} from 'src/app/constant/constants';
import PayHeadModel from './payHead/models/PayHeadModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['payHeads'];
const PayHeadApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayHeads: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PAY_HEADS, params: { page, size, searchKey } }),
				providesTags: ['payHeads']
			}),
			deletePayHeads: build.mutation({
				query: (payHeadIds) => ({
					url: DELETE_PAY_HEAD_MULTIPLE,
					method: 'DELETE',
					data: { ids: payHeadIds }
				}),
				invalidatesTags: ['payHeads']
			}),
			getPayHead: build.query({
				query: (payHeadId) => ({
					url: `${GET_PAY_HEAD_BY_ID}${payHeadId}`
				}),
				providesTags: ['payHeads']
			}),
			createPayHead: build.mutation({
				query: (newPayHead) => ({
					url: CREATE_PAY_HEAD,
					method: 'POST',
					data: jsonToFormData(PayHeadModel(newPayHead))
				}),
				invalidatesTags: ['payHeads']
			}),
			updatePayHead: build.mutation({
				query: (payHead) => ({
					url: `${UPDATE_PAY_HEAD}${payHead.id}`,
					method: 'PUT',
					data: jsonToFormData(payHead)
				}),
				invalidatesTags: ['payHeads']
			}),
			deletePayHead: build.mutation({
				query: (payHeadId) => ({
					url: `${DELETE_PAY_HEAD}${payHeadId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['payHeads']
			})
		}),
		overrideExisting: false
	});
export default PayHeadApi;
export const {
	useGetPayHeadsQuery,
	useDeletePayHeadsMutation,
	useGetPayHeadQuery,
	useUpdatePayHeadMutation,
	useDeletePayHeadMutation,

	useCreatePayHeadMutation
} = PayHeadApi;

export const selectFilteredPayHeads = (payHeads) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return payHeads;
		}

		return FuseUtils.filterArrayByString(payHeads, searchText);
	});
