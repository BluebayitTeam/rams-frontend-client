import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_JOURNALID,
	DELETE_JOURNALID,
	DELETE_JOURNALID_MULTIPLE,
	GET_JOURNALIDS,
	GET_JOURNALID_BY_INVOICE_NO,
	UPDATE_JOURNALID
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import JournalIDModel from './journalID/models/JournalIDModel';

export const addTagTypes = ['journalIDs'];
const JournalIDApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getJournalIDs: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_JOURNALIDS,
					params: { page, size, searchKey }
				}),
				providesTags: ['journalIDs']
			}),
			deleteJournalIDs: build.mutation({
				query: (journalIDIds) => ({
					url: DELETE_JOURNALID_MULTIPLE,
					method: 'DELETE',
					data: { ids: journalIDIds }
				}),
				invalidatesTags: ['journalIDs']
			}),
			getJournalID: build.query({
				query: (journalIDId) => ({
					url: `${GET_JOURNALID_BY_INVOICE_NO}${journalIDId}`
				}),
				providesTags: ['journalIDs']
			}),
			createJournalID: build.mutation({
				query: (newJournalID) => ({
					url: CREATE_JOURNALID,
					method: 'POST',
					data: JournalIDModel(newJournalID)
				}),
				invalidatesTags: ['journalIDs']
			}),
			updateJournalID: build.mutation({
				query: (journalID) => ({
					url: `${UPDATE_JOURNALID}`,
					method: 'PUT',
					data: journalID
				}),
				invalidatesTags: ['journalIDs']
			}),
			deleteJournalID: build.mutation({
				query: (journalIDId) => ({
					url: `${DELETE_JOURNALID}${journalIDId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['journalIDs']
			})
		}),
		overrideExisting: false
	});
export default JournalIDApi;
export const {
	useGetJournalIDsQuery,
	useDeleteJournalIDsMutation,
	useGetJournalIDQuery,
	useUpdateJournalIDMutation,
	useDeleteJournalIDMutation,

	useCreateJournalIDMutation
} = JournalIDApi;

export const selectFilteredJournalIDs = (journalIDs) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return journalIDs;
		}

		return FuseUtils.filterArrayByString(journalIDs, searchText);
	});
