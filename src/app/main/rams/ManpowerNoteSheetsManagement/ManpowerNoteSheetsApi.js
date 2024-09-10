import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERSBLISTS_BY_DATE } from 'src/app/constant/constants';
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
				query: ({ manPowerDate }) => {
					if (!manPowerDate) {
						return { url: null };
					}

					return {
						url: MANPOWERSBLISTS_BY_DATE,
						params: {
							man_power_date: manPowerDate || ''
						}
					};
				},
				async onQueryStarted({ manPowerDate, passenger }, { queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						if (Array.isArray(data) && data.length === 0) {
							CustomNotification('error', 'There are no manpower records');
						}
					} catch (error) {
						console.log('Error:', error);
					}
				},
				providesTags: ['manpowerNoteSheets']
			})
		})
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
