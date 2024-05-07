import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_VISAENTRYS,
	GET_VISAENTRY_BY_ID,
	CREATE_VISAENTRY,
	DELETE_VISAENTRY,
	UPDATE_VISAENTRY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import VisaEntryModel from './visaEntry/models/VisaEntryModel';

export const addTagTypes = ['visaEntrys'];
const VisaEntryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getVisaEntrys: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_VISAENTRYS,
					params: { page, size, searchKey }
				}),
				providesTags: ['visaEntrys']
			}),
			deleteVisaEntrys: build.mutation({
				query: (visaEntryIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: visaEntryIds
				}),
				invalidatesTags: ['visaEntrys']
			}),
			getVisaEntry: build.query({
				query: (visaEntryId) => ({
					url: `${GET_VISAENTRY_BY_ID}${visaEntryId}`
				}),
				providesTags: ['visaEntrys']
			}),
			createVisaEntry: build.mutation({
				query: (newVisaEntry) => ({
					url: CREATE_VISAENTRY,
					method: 'POST',
					data: jsonToFormData(VisaEntryModel(newVisaEntry))
				}),
				invalidatesTags: ['visaEntrys']
			}),
			updateVisaEntry: build.mutation({
				query: (visaEntry) => ({
					url: `${UPDATE_VISAENTRY}${visaEntry.id}`,
					method: 'PUT',
					data: jsonToFormData(visaEntry)
				}),
				invalidatesTags: ['visaEntrys']
			}),
			deleteVisaEntry: build.mutation({
				query: (visaEntryId) => ({
					url: `${DELETE_VISAENTRY}${visaEntryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['visaEntrys']
			})
		}),
		overrideExisting: false
	});
export default VisaEntryApi;
export const {
	useGetVisaEntrysQuery,
	useDeleteVisaEntrysMutation,
	useGetVisaEntryQuery,
	useUpdateVisaEntryMutation,
	useDeleteVisaEntryMutation,
	useCreateVisaEntryMutation
} = VisaEntryApi;

export const selectFilteredVisaEntrys = (visaEntrys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return visaEntrys;
		}

		return FuseUtils.filterArrayByString(visaEntrys, searchText);
	});
