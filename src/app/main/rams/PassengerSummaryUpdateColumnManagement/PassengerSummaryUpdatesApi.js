import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_DEMANDS,
	GET_DEMAND_BY_ID,
	CREATE_DEMAND,
	DELETE_DEMAND,
	UPDATE_DEMAND,
	GET_PASSENGER_UPDATES
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerSummaryUpdateModel from './passengerSummaryUpdate/models/PassengerSummaryUpdateModel';

export const addTagTypes = ['passengerSummaryUpdates'];
const PassengerSummaryUpdateApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerSummaryUpdates: build.query({
        query: (filterData) => ({
          url: `${GET_PASSENGER_UPDATES}`,
          params: filterData,
        }),
        providesTags: ['passengerSummaryUpdates'],
      }),
      getMultiplePassengers: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_DEMANDS,
          params: { page, size, searchKey },
        }),
        providesTags: ['passengerSummaryUpdates'],
      }),
      deletePassengerSummaryUpdates: build.mutation({
        query: (passengerSummaryUpdateIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: passengerSummaryUpdateIds,
        }),
        invalidatesTags: ['passengerSummaryUpdates'],
      }),
      getPassengerSummaryUpdate: build.query({
        query: (passengerSummaryUpdateId) => ({
          url: `${GET_DEMAND_BY_ID}${passengerSummaryUpdateId}`,
        }),
        providesTags: ['passengerSummaryUpdates'],
      }),
      createPassengerSummaryUpdate: build.mutation({
        query: (newPassengerSummaryUpdate) => ({
          url: CREATE_DEMAND,
          method: 'POST',
          data: jsonToFormData(
            PassengerSummaryUpdateModel(newPassengerSummaryUpdate)
          ),
        }),
        invalidatesTags: ['passengerSummaryUpdates'],
      }),
      updatePassengerSummaryUpdate: build.mutation({
        query: (passengerSummaryUpdate) => ({
          url: `${UPDATE_DEMAND}${passengerSummaryUpdate.id}`,
          method: 'PUT',
          data: jsonToFormData(passengerSummaryUpdate),
        }),
        invalidatesTags: ['passengerSummaryUpdates'],
      }),
      deletePassengerSummaryUpdate: build.mutation({
        query: (passengerSummaryUpdateId) => ({
          url: `${DELETE_DEMAND}${passengerSummaryUpdateId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['passengerSummaryUpdates'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerSummaryUpdateApi;
export const {
	useGetPassengerSummaryUpdatesQuery,
	useDeletePassengerSummaryUpdatesMutation,
	useGetPassengerSummaryUpdateQuery,
	useUpdatePassengerSummaryUpdateMutation,
	useDeletePassengerSummaryUpdateMutation,
	useCreatePassengerSummaryUpdateMutation
} = PassengerSummaryUpdateApi;

export const selectFilteredPassengerSummaryUpdates = (passengerSummaryUpdates) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerSummaryUpdates;
		}

		return FuseUtils.filterArrayByString(passengerSummaryUpdates, searchText);
	});
