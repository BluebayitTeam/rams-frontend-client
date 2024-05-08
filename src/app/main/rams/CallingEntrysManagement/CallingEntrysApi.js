import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_VISAENTRY_BY_ID,
	CREATE_VISAENTRY,
	DELETE_VISAENTRY,
	UPDATE_VISAENTRY,
	GET_CALLING_ENTRY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CallingEntryModel from './callingEntry/models/CallingEntryModel';

export const addTagTypes = ['callingEntrys'];
const CallingEntryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCallingEntrys: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_CALLING_ENTRY,
					params: { page, size, searchKey }
				}),
				providesTags: ['callingEntrys']
			}),
			deleteCallingEntrys: build.mutation({
				query: (callingEntryIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: callingEntryIds
				}),
				invalidatesTags: ['callingEntrys']
			}),
			getCallingEntry: build.query({
				query: (callingEntryId) => ({
					url: `${GET_VISAENTRY_BY_ID}${callingEntryId}`
				}),
				providesTags: ['callingEntrys']
			}),
			createCallingEntry: build.mutation({
				query: (newCallingEntry) => ({
					url: CREATE_VISAENTRY,
					method: 'POST',
					data: jsonToFormData(CallingEntryModel(newCallingEntry))
				}),
				invalidatesTags: ['callingEntrys']
			}),
			updateCallingEntry: build.mutation({
				query: (callingEntry) => ({
					url: `${UPDATE_VISAENTRY}${callingEntry.id}`,
					method: 'PUT',
					data: jsonToFormData(callingEntry)
				}),
				invalidatesTags: ['callingEntrys']
			}),
			deleteCallingEntry: build.mutation({
				query: (callingEntryId) => ({
					url: `${DELETE_VISAENTRY}${callingEntryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['callingEntrys']
			})
		}),
		overrideExisting: false
	});
export default CallingEntryApi;
export const {
	useGetCallingEntrysQuery,
	useDeleteCallingEntrysMutation,
	useGetCallingEntryQuery,
	useUpdateCallingEntryMutation,
	useDeleteCallingEntryMutation,
	useCreateCallingEntryMutation
} = CallingEntryApi;

export const selectFilteredCallingEntrys = (callingEntrys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingEntrys;
		}

		return FuseUtils.filterArrayByString(callingEntrys, searchText);
	});
