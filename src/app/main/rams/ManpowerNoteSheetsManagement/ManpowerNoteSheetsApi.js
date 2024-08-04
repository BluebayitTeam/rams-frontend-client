import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERNTSHEETS_BY_DATE } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['manpowerNoteSheets'];

const ManpowerNoteSheetApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getManpowerNoteSheet: build.query({
				query: (manpowerNoteSheetId) => ({
					url: `${MANPOWERNTSHEETS_BY_DATE}${manpowerNoteSheetId}`
				}),
				providesTags: ['manpowerNoteSheets'],
				async onQueryStarted(manpowerNoteSheetId, { queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						CustomNotification('error', `${error?.error?.response?.data?.detail}`);
					}
				}
			})
		}),
		overrideExisting: false
	});

export default ManpowerNoteSheetApi;

export const { useGetManpowerNoteSheetsQuery, useGetManpowerNoteSheetQuery } = ManpowerNoteSheetApi;

export const selectFilteredManpowerNoteSheets = (manpowerNoteSheets) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return manpowerNoteSheets;
		}

		return FuseUtils.filterArrayByString(manpowerNoteSheets, searchText);
	});
