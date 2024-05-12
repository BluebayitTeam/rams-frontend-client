import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_E_VISAENTRYS,
	GET_E_VISAENTRY_BY_ID,
	CREATE_E_VISAENTRY,
	DELETE_E_VISAENTRY,
	UPDATE_E_VISAENTRY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CallingAssignModel from './callingAssign/models/CallingAssignModel';

export const addTagTypes = ['callingAssigns'];
const CallingAssignApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCallingAssigns: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_E_VISAENTRYS,
					params: { page, size, searchKey }
				}),
				providesTags: ['callingAssigns']
			}),
			deleteCallingAssigns: build.mutation({
				query: (callingAssignIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: callingAssignIds
				}),
				invalidatesTags: ['callingAssigns']
			}),
			getCallingAssign: build.query({
				query: (callingAssignId) => ({
					url: `${GET_E_VISAENTRY_BY_ID}${callingAssignId}`
				}),
				providesTags: ['callingAssigns']
			}),
			createCallingAssign: build.mutation({
				query: (newCallingAssign) => ({
					url: CREATE_E_VISAENTRY,
					method: 'POST',
					data: jsonToFormData(CallingAssignModel(newCallingAssign))
				}),
				invalidatesTags: ['callingAssigns']
			}),
			updateCallingAssign: build.mutation({
				query: (callingAssign) => ({
					url: `${UPDATE_E_VISAENTRY}${callingAssign.id}`,
					method: 'PUT',
					data: jsonToFormData(callingAssign)
				}),
				invalidatesTags: ['callingAssigns']
			}),
			deleteCallingAssign: build.mutation({
				query: (callingAssignId) => ({
					url: `${DELETE_E_VISAENTRY}${callingAssignId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['callingAssigns']
			})
		}),
		overrideExisting: false
	});
export default CallingAssignApi;
export const {
	useGetCallingAssignsQuery,
	useDeleteCallingAssignsMutation,
	useGetCallingAssignQuery,
	useUpdateCallingAssignMutation,
	useDeleteCallingAssignMutation,
	useCreateCallingAssignMutation
} = CallingAssignApi;

export const selectFilteredCallingAssigns = (callingAssigns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingAssigns;
		}

		return FuseUtils.filterArrayByString(callingAssigns, searchText);
	});
