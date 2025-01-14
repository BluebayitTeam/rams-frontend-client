import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_PAY_HEAD_TYPE,
	DELETE_PAY_HEAD_TYPE,
	DELETE_PAY_HEAD_TYPE_MULTIPLE,
	GET_PAY_HEAD_TYPES,
	GET_PAY_HEAD_TYPE_BY_ID,
	UPDATE_PAY_HEAD_TYPE
} from 'src/app/constant/constants';
import PayHeadTypeModel from './payHeadType/models/PayHeadTypeModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['payHeadTypes'];
const PayHeadTypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayHeadTypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PAY_HEAD_TYPES, params: { page, size, searchKey } }),
				providesTags: ['payHeadTypes']
			}),
			deletePayHeadTypes: build.mutation({
				query: (payHeadTypeIds) => ({
					url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
					method: 'DELETE',
					data: { ids: payHeadTypeIds }
				}),
				invalidatesTags: ['payHeadTypes']
			}),
			getPayHeadType: build.query({
				query: (payHeadTypeId) => ({
					url: `${GET_PAY_HEAD_TYPE_BY_ID}${payHeadTypeId}`
				}),
				providesTags: ['payHeadTypes']
			}),
			createPayHeadType: build.mutation({
				query: (newPayHeadType) => ({
					url: CREATE_PAY_HEAD_TYPE,
					method: 'POST',
					data: jsonToFormData(PayHeadTypeModel(newPayHeadType))
				}),
				invalidatesTags: ['payHeadTypes']
			}),
			updatePayHeadType: build.mutation({
				query: (payHeadType) => ({
					url: `${UPDATE_PAY_HEAD_TYPE}${payHeadType.id}`,
					method: 'PUT',
					data: jsonToFormData(payHeadType)
				}),
				invalidatesTags: ['payHeadTypes']
			}),
			deletePayHeadType: build.mutation({
				query: (payHeadTypeId) => ({
					url: `${DELETE_PAY_HEAD_TYPE}${payHeadTypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['payHeadTypes']
			})
		}),
		overrideExisting: false
	});
export default PayHeadTypeApi;
export const {
	useGetPayHeadTypesQuery,
	useDeletePayHeadTypesMutation,
	useGetPayHeadTypeQuery,
	useUpdatePayHeadTypeMutation,
	useDeletePayHeadTypeMutation,

	useCreatePayHeadTypeMutation
} = PayHeadTypeApi;

export const selectFilteredPayHeadTypes = (payHeadTypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return payHeadTypes;
		}

		return FuseUtils.filterArrayByString(payHeadTypes, searchText);
	});
