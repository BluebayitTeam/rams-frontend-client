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
import VisaSubmissionListModel from './visaSubmissionList/models/VisaSubmissionListModel';

export const addTagTypes = ['visaSubmissionLists'];
const VisaSubmissionListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getVisaSubmissionLists: build.query({
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
				providesTags: ['visaSubmissionLists']
			}),

			deleteVisaSubmissionLists: build.mutation({
				query: (visaSubmissionListId) => ({
					url: `${DELETE_MANPOWERLIST}${visaSubmissionListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['visaSubmissionLists']
			}),
			getVisaSubmissionList: build.query({
				query: (visaSubmissionListId) => ({
					url: `${MANPOWERLIST_BY_PASSENGER_ID}${visaSubmissionListId}`
				}),
				providesTags: ['visaSubmissionLists']
			}),
			createVisaSubmissionList: build.mutation({
				query: (newVisaSubmissionList) => ({
					url: CREATE_MANPOWERLIST,
					method: 'POST',
					data: jsonToFormData(VisaSubmissionListModel(newVisaSubmissionList))
				}),
				invalidatesTags: ['visaSubmissionLists']
			}),
			updateVisaSubmissionList: build.mutation({
				query: (visaSubmissionList) => ({
					url: `${UPDATE_MANPOWERLIST}${visaSubmissionList.id}`,
					method: 'PUT',
					data: jsonToFormData(visaSubmissionList)
				}),
				invalidatesTags: ['visaSubmissionLists']
			})
		}),
		overrideExisting: false
	});
export default VisaSubmissionListApi;
export const {
	useGetVisaSubmissionListsQuery,
	useDeleteVisaSubmissionListsMutation,
	useGetVisaSubmissionListQuery,
	useUpdateVisaSubmissionListMutation,
	useDeleteVisaSubmissionListMutation,

	useCreateVisaSubmissionListMutation
} = VisaSubmissionListApi;

export const selectFilteredVisaSubmissionLists = (visaSubmissionLists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return visaSubmissionLists;
		}

		return FuseUtils.filterArrayByString(visaSubmissionLists, searchText);
	});
