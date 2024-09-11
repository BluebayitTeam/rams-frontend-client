import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERSBLISTS_BY_DATE } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['listOfManpowerRefs'];

const ListOfManpowerRefApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getListOfManpowerRef: build.query({
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
				async onQueryStarted({ manPowerDate }, { queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						if (Array.isArray(data) && data.length === 0) {
							CustomNotification('error', 'There are no manpower records');
						}
					} catch (error) {
						console.log('Error:', error);
					}
				},
				providesTags: ['listOfManpowerRefs']
			})
		})
	});

export default ListOfManpowerRefApi;

export const { useGetListOfManpowerRefsQuery, useGetListOfManpowerRefQuery } = ListOfManpowerRefApi;

export const selectFilteredListOfManpowerRefs = (listOfManpowerRefs) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return listOfManpowerRefs;
		}

		return FuseUtils.filterArrayByString(listOfManpowerRefs, searchText);
	});
