import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	ALL_USERS,
	CREATE_TICKET,
	CREATE_TICKET_DETAIL,
	DELETE_DEPARTMENT,
	GET_TICKETS,
	GET_TICKET_DETAILS_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import SupportModel from './support/models/SupportModel';

export const addTagTypes = ['supports'];
const SupportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSupports: build.query({
				query: (searchKey) => ({ url: `${GET_TICKETS}?key=${searchKey || ''}` }),
				providesTags: ['supports']
			}),
			deleteSupports: build.mutation({
				query: (supportIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: supportIds
				}),
				invalidatesTags: ['supports']
			}),
			getSupport: build.query({
				query: (supportId) => ({
					url: `${GET_TICKET_DETAILS_BY_ID}${supportId}`
				}),
				providesTags: ['supports']
			}),
			createSupport: build.mutation({
				query: (newSupport) => ({
					url: CREATE_TICKET_DETAIL,
					method: 'POST',
					data: jsonToFormData(SupportModel(newSupport))
				}),
				invalidatesTags: ['supports']
			}),
			createNewSupport: build.mutation({
				query: (newSupport) => ({
					url: CREATE_TICKET,
					method: 'POST',
					data: jsonToFormData(SupportModel(newSupport))
				}),
				invalidatesTags: ['supports']
			}),
			updateSupport: build.mutation({
				query: (support) => ({
					url: `${UPDATE_DEPARTMENT}${support.id}`,
					method: 'PUT',
					data: jsonToFormData(support)
				}),
				invalidatesTags: ['supports']
			}),
			deleteSupport: build.mutation({
				query: (supportId) => ({
					url: `${DELETE_DEPARTMENT}${supportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['supports']
			})
		}),
		overrideExisting: false
	});
export default SupportApi;
export const {
	useGetSupportsQuery,
	useDeleteSupportsMutation,
	useGetSupportQuery,
	useUpdateSupportMutation,
	useDeleteSupportMutation,
	useGetNewSupportQuery,
	useCreateSupportMutation,
	useCreateNewSupportMutation
} = SupportApi;

export const selectFilteredSupports = (supports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return supports;
		}

		return FuseUtils.filterArrayByString(supports, searchText);
	});
