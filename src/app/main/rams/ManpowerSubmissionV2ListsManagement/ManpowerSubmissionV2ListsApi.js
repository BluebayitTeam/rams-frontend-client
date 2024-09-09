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
import ManpowerSubmissionV2ListModel from './manpowerSubmissionV2List/models/ManpowerSubmissionV2List.Model';

export const addTagTypes = ['manpowerSubmissionV2Lists'];
const ManpowerSubmissionV2ListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// getManpowerSubmissionV2Lists: build.query({
			// 	query: ({ manPowerDate, passenger }) => ({
			// 		url: MANPOWERSBLISTS_BY_DATE,
			// 		params: {
			// 			man_power_date: manPowerDate,
			// 			passenger
			// 		}
			// 	}),
			// 	async onQueryStarted({ manPowerDate, passenger }, { queryFulfilled }) {
			// 		try {
			// 			await queryFulfilled;
			// 		} catch (error) {
			// 			console.log('sddsfdsfdsfdsfds', error);
			// 			// CustomNotification('error', error?.error?.response?.data?.detail);
			// 		}
			// 	},
			// 	providesTags: ['manpowerSubmissionV2Lists']
			// }),

			getManpowerSubmissionV2Lists: build.query({
				query: ({ manPowerDate, passenger }) => {
					if (!manPowerDate && !passenger) {
						return { url: null }; // Avoid calling the API when both values are empty
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
						// CustomNotification('error', error?.error?.response?.data?.detail);
					}
				},
				providesTags: ['manpowerSubmissionV2Lists']
			}),

			deleteManpowerSubmissionV2Lists: build.mutation({
				query: (manpowerSubmissionV2ListId) => ({
					url: `${DELETE_MANPOWERLIST}${manpowerSubmissionV2ListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['manpowerSubmissionV2Lists']
			}),
			getManpowerSubmissionV2List: build.query({
				query: (manpowerSubmissionV2ListId) => ({
					url: `${MANPOWERLIST_BY_PASSENGER_ID}${manpowerSubmissionV2ListId}`
				}),
				providesTags: ['manpowerSubmissionV2Lists']
			}),
			createManpowerSubmissionV2List: build.mutation({
				query: (newManpowerSubmissionV2List) => ({
					url: CREATE_MANPOWERLIST,
					method: 'POST',
					data: jsonToFormData(ManpowerSubmissionV2ListModel(newManpowerSubmissionV2List))
				}),
				invalidatesTags: ['manpowerSubmissionV2Lists']
			}),
			updateManpowerSubmissionV2List: build.mutation({
				query: (manpowerSubmissionV2List) => ({
					url: `${UPDATE_MANPOWERLIST}${manpowerSubmissionV2List.id}`,
					method: 'PUT',
					data: jsonToFormData(manpowerSubmissionV2List)
				}),
				invalidatesTags: ['manpowerSubmissionV2Lists']
			})
		}),
		overrideExisting: false
	});
export default ManpowerSubmissionV2ListApi;
export const {
	useGetManpowerSubmissionV2ListsQuery,
	useDeleteManpowerSubmissionV2ListsMutation,
	useGetManpowerSubmissionV2ListQuery,
	useUpdateManpowerSubmissionV2ListMutation,
	useDeleteManpowerSubmissionV2ListMutation,

	useCreateManpowerSubmissionV2ListMutation
} = ManpowerSubmissionV2ListApi;

export const selectFilteredManpowerSubmissionV2Lists = (manpowerSubmissionV2Lists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return manpowerSubmissionV2Lists;
		}

		return FuseUtils.filterArrayByString(manpowerSubmissionV2Lists, searchText);
	});
