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
import BmetApplicationModel from './bmetApplication/models/BmetApplicationModel';

export const addTagTypes = ['bmetApplications'];
const BmetApplicationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmetApplications: build.query({
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
				providesTags: ['bmetApplications']
			}),

			deleteBmetApplications: build.mutation({
				query: (bmetApplicationId) => ({
					url: `${DELETE_MANPOWERLIST}${bmetApplicationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['bmetApplications']
			}),
			getBmetApplication: build.query({
				query: (bmetApplicationId) => ({
					url: `${MANPOWERLIST_BY_PASSENGER_ID}${bmetApplicationId}`
				}),
				providesTags: ['bmetApplications']
			}),
			createBmetApplication: build.mutation({
				query: (newBmetApplication) => ({
					url: CREATE_MANPOWERLIST,
					method: 'POST',
					data: jsonToFormData(BmetApplicationModel(newBmetApplication))
				}),
				invalidatesTags: ['bmetApplications']
			}),
			updateBmetApplication: build.mutation({
				query: (bmetApplication) => ({
					url: `${UPDATE_MANPOWERLIST}${bmetApplication.id}`,
					method: 'PUT',
					data: jsonToFormData(bmetApplication)
				}),
				invalidatesTags: ['bmetApplications']
			})
		}),
		overrideExisting: false
	});
export default BmetApplicationApi;
export const {
	useGetBmetApplicationsQuery,
	useDeleteBmetApplicationsMutation,
	useGetBmetApplicationQuery,
	useUpdateBmetApplicationMutation,
	useDeleteBmetApplicationMutation,

	useCreateBmetApplicationMutation
} = BmetApplicationApi;

export const selectFilteredBmetApplications = (bmetApplications) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return bmetApplications;
		}

		return FuseUtils.filterArrayByString(bmetApplications, searchText);
	});
