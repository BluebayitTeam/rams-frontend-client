import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_PASSENGERSEARCH,
  UPDATE_PASSENGERSEARCH,
  DELETE_PASSENGERSEARCH,
  PASSENGERSEARCH_BY_PASSENGER_ID,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerSearchModel from './passengerSearch/models/PassengerSearchModel';

export const addTagTypes = ['passengerSearchs'];
const PassengerSearchApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerSearch: build.query({
        query: (passengerSearchId) => ({
          url: `${PASSENGERSEARCH_BY_PASSENGER_ID}${passengerSearchId}`,
        }),
        providesTags: ['passengerSearchs'],
      }),
      createPassengerSearch: build.mutation({
        query: (newPassengerSearch) => ({
          url: CREATE_PASSENGERSEARCH,
          method: 'POST',
          data: jsonToFormData(
            PassengerSearchModel(
              newPassengerSearch
              // man_power_date: moment(new Date(newPassengerSearch?.man_power_date)).format('YYYY-MM-DD'),
              // submit_date: moment(new Date(newPassengerSearch?.submit_date)).format('YYYY-MM-DD')
            )
          ),
        }),
        invalidatesTags: ['passengerSearchs'],
      }),
      updatePassengerSearch: build.mutation({
        query: (passengerSearch) => ({
          url: `${UPDATE_PASSENGERSEARCH}${passengerSearch.id}`,
          method: 'PUT',
          data: jsonToFormData(
            passengerSearch
            // man_power_date: moment(new Date(passengerSearch?.man_power_date)).format('YYYY-MM-DD'),
            // submit_date: moment(new Date(passengerSearch?.submit_date)).format('YYYY-MM-DD')
          ),
        }),
        invalidatesTags: ['passengerSearchs'],
      }),
      deletePassengerSearch: build.mutation({
        query: (passengerSearchId) => ({
          url: `${DELETE_PASSENGERSEARCH}${passengerSearchId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['passengerSearchs'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerSearchApi;
export const {
  useGetPassengerSearchsQuery,
  useDeletePassengerSearchsMutation,
  useGetPassengerSearchQuery,
  useUpdatePassengerSearchMutation,
  useDeletePassengerSearchMutation,
  useCreatePassengerSearchMutation,
} = PassengerSearchApi;

export const selectFilteredPassengerSearchs = (passengerSearchs) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerSearchs;
    }

    return FuseUtils.filterArrayByString(passengerSearchs, searchText);
  });
