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
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import JournalIdModel from './journalId/models/JournalIdModel';

export const addTagTypes = ['journalIds'];
const JournalIdApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getJournalIds: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_JOURNALIDS,
					params: { page, size, searchKey }
				}),
				providesTags: ['journalIds']
			}),
			deleteJournalIds: build.mutation({
				query: (journalIdIds) => ({
					url: DELETE_JOURNALID_MULTIPLE,
					method: 'DELETE',
					data: { ids: journalIdIds }
				}),
				invalidatesTags: ['journalIds']
			}),
			getJournalId: build.query({
				query: (journalIdId) => ({
					url: `${GET_JOURNALID_BY_INVOICE_NO}${journalIdId}`
				}),
				providesTags: ['journalIds']
			}),
			createJournalId: build.mutation({
				query: (newJournalId) => ({
					url: CREATE_JOURNALID,
					method: 'POST',
					data: jsonToFormData(JournalIdModel(newJournalId))
				}),
				invalidatesTags: ['journalIds']
			}),
			updateJournalId: build.mutation({
				query: (journalId) => ({
					url: `${UPDATE_JOURNALID}`,
					method: 'PUT',
					data: jsonToFormData(journalId)
				}),
				invalidatesTags: ['journalIds']
			}),
			deleteJournalId: build.mutation({
				query: (journalIdId) => ({
					url: `${DELETE_JOURNALID}${journalIdId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['journalIds']
			})
		}),
		overrideExisting: false
	});
export default JournalIdApi;
export const {
	useGetJournalIdsQuery,
	useDeleteJournalIdsMutation,
	useGetJournalIdQuery,
	useUpdateJournalIdMutation,
	useDeleteJournalIdMutation,

	useCreateJournalIdMutation
} = JournalIdApi;

export const selectFilteredJournalIds = (journalIds) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return journalIds;
		}

		return FuseUtils.filterArrayByString(journalIds, searchText);
	});
