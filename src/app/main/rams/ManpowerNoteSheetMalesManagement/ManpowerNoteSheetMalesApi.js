import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERSBLISTS_BY_DATE } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['manpowerNoteSheetMales'];

const ManpowerNoteSheetMaleApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getManpowerNoteSheetMale: build.query({
				query: ({ manPowerDate }) => ({
					url: MANPOWERSBLISTS_BY_DATE,
					params: {
						man_power_date: manPowerDate
					}
				}),
				async onQueryStarted({ manPowerDate }, { queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						CustomNotification('error', error?.error?.response?.data?.detail);
					}
				},
				providesTags: ['manpowerNoteSheetMales'],
				async onQueryStarted(manpowerNoteSheetMaleId, { queryFulfilled }) {
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

export default ManpowerNoteSheetMaleApi;

export const { useGetManpowerNoteSheetMaleQuery } = ManpowerNoteSheetMaleApi;

export const selectFilteredManpowerNoteSheetMales = (manpowerNoteSheetMales) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return manpowerNoteSheetMales;
		}

		return FuseUtils.filterArrayByString(manpowerNoteSheetMales, searchText);
	});
