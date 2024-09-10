import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MANPOWERLIST,
	DELETE_MANPOWERLIST,
	MANPOWERLIST_BY_PASSENGER_ID,
	MANPOWERSBLISTS_BY_DATE,
	UPDATE_MANPOWERLIST
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';
import ManpowerSubmissionListModel from './manpowerSubmissionList/models/ManpowerSubmissionListModel';

export const addTagTypes = ['manpowerSubmissionLists'];
const ManpowerSubmissionListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getManpowerSubmissionLists: build.query({
				query: ({ manPowerDate, passenger }) => {
					if (!manPowerDate && !passenger) {
						return { url: null };
					}

					return {
						url: MANPOWERSBLISTS_BY_DATE,
						params: {
							man_power_date: manPowerDate,
							passenger
						}
					};
				},
				async onQueryStarted({ manPowerDate, passenger }, { queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						// Check if the response is an empty array
						if (Array.isArray(data) && data.length === 0) {
							CustomNotification('error', 'There are no manpower records');
						}
					} catch (error) {
						console.log('Error:', error);
					}
				},
				providesTags: ['manpowerSubmissionLists']
			}),

			deleteManpowerSubmissionLists: build.mutation({
				query: (manpowerSubmissionListId) => ({
					url: `${DELETE_MANPOWERLIST}${manpowerSubmissionListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			}),
			getManpowerSubmissionList: build.query({
				query: (manpowerSubmissionListId) => ({
					url: `${MANPOWERLIST_BY_PASSENGER_ID}${manpowerSubmissionListId}`
				}),
				providesTags: ['manpowerSubmissionLists']
			}),
			createManpowerSubmissionList: build.mutation({
				query: (newManpowerSubmissionList) => ({
					url: CREATE_MANPOWERLIST,
					method: 'POST',
					data: jsonToFormData(ManpowerSubmissionListModel(newManpowerSubmissionList))
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			}),
			updateManpowerSubmissionList: build.mutation({
				query: (manpowerSubmissionList) => ({
					url: `${UPDATE_MANPOWERLIST}${manpowerSubmissionList.id}`,
					method: 'PUT',
					data: jsonToFormData(manpowerSubmissionList)
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			})
		}),
		overrideExisting: false
	});
export default ManpowerSubmissionListApi;
export const {
	useGetManpowerSubmissionListsQuery,
	useDeleteManpowerSubmissionListsMutation,
	useGetManpowerSubmissionListQuery,
	useUpdateManpowerSubmissionListMutation,
	useDeleteManpowerSubmissionListMutation,

	useCreateManpowerSubmissionListMutation
} = ManpowerSubmissionListApi;

export const selectFilteredManpowerSubmissionLists = (manpowerSubmissionLists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return manpowerSubmissionLists;
		}

		return FuseUtils.filterArrayByString(manpowerSubmissionLists, searchText);
	});
