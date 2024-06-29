import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_JOURNAL,
	DELETE_JOURNAL,
	DELETE_JOURNAL_MULTIPLE,
	GET_JOURNALS,
	GET_JOURNAL_BY_INVOICE_NO,
	UPDATE_JOURNAL
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import JournalModel from './journal/models/JournalModel';

export const addTagTypes = ['journals'];
const JournalApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getJournals: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_JOURNALS,
					params: { page, size, searchKey }
				}),
				providesTags: ['journals']
			}),
			deleteJournals: build.mutation({
				query: (journalIds) => ({
					url: DELETE_JOURNAL_MULTIPLE,
					method: 'DELETE',
					data: { ids: journalIds }
				}),
				invalidatesTags: ['journals']
			}),
			getJournal: build.query({
				query: (journalId) => ({
					url: `${GET_JOURNAL_BY_INVOICE_NO}${journalId}`
				}),
				providesTags: ['journals']
			}),
			createJournal: build.mutation({
				query: (newJournal) => ({
					url: CREATE_JOURNAL,
					method: 'POST',
					data: JournalModel(newJournal)
				}),
				invalidatesTags: ['journals']
			}),
			updateJournal: build.mutation({
				query: (journal) => ({
					url: `${UPDATE_JOURNAL}`,
					method: 'PUT',
					data: journal
				}),
				invalidatesTags: ['journals']
			}),
			deleteJournal: build.mutation({
				query: (journalId) => ({
					url: `${DELETE_JOURNAL}${journalId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['journals']
			})
		}),
		overrideExisting: false
	});
export default JournalApi;
export const {
	useGetJournalsQuery,
	useDeleteJournalsMutation,
	useGetJournalQuery,
	useUpdateJournalMutation,
	useDeleteJournalMutation,

	useCreateJournalMutation
} = JournalApi;

export const selectFilteredJournals = (journals) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return journals;
		}

		return FuseUtils.filterArrayByString(journals, searchText);
	});
