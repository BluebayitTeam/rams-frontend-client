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
import EvisaEntryModel from './evisaEntry/models/EvisaEntryModel';

export const addTagTypes = ['evisaEntrys'];
const EvisaEntryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getEvisaEntrys: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_E_VISAENTRYS,
					params: { page, size, searchKey }
				}),
				providesTags: ['evisaEntrys']
			}),
			deleteEvisaEntrys: build.mutation({
				query: (evisaEntryIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: evisaEntryIds
				}),
				invalidatesTags: ['evisaEntrys']
			}),
			getEvisaEntry: build.query({
				query: (evisaEntryId) => ({
					url: `${GET_E_VISAENTRY_BY_ID}${evisaEntryId}`
				}),
				providesTags: ['evisaEntrys']
			}),
			createEvisaEntry: build.mutation({
				query: (newEvisaEntry) => ({
					url: CREATE_E_VISAENTRY,
					method: 'POST',
					data: jsonToFormData(
						EvisaEntryModel({
							issue_date: newEvisaEntry?.issue_date,
							exp_date: newEvisaEntry?.exp_date,
							visa_number: newEvisaEntry?.visa_number,
							current_status: newEvisaEntry?.current_status,
							status: newEvisaEntry?.status,
							file: newEvisaEntry?.file,
							passenger: newEvisaEntry?.passenger_list
						})
					)
				}),
				invalidatesTags: ['evisaEntrys']
			}),
			updateEvisaEntry: build.mutation({
				query: (evisaEntry) => ({
					url: `${UPDATE_E_VISAENTRY}${evisaEntry.id}`,
					method: 'PUT',
					data: jsonToFormData(evisaEntry)
				}),
				invalidatesTags: ['evisaEntrys']
			}),
			deleteEvisaEntry: build.mutation({
				query: (evisaEntryId) => ({
					url: `${DELETE_E_VISAENTRY}${evisaEntryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['evisaEntrys']
			})
		}),
		overrideExisting: false
	});
export default EvisaEntryApi;
export const {
	useGetEvisaEntrysQuery,
	useDeleteEvisaEntrysMutation,
	useGetEvisaEntryQuery,
	useUpdateEvisaEntryMutation,
	useDeleteEvisaEntryMutation,
	useCreateEvisaEntryMutation
} = EvisaEntryApi;

export const selectFilteredEvisaEntrys = (evisaEntrys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return evisaEntrys;
		}

		return FuseUtils.filterArrayByString(evisaEntrys, searchText);
	});
