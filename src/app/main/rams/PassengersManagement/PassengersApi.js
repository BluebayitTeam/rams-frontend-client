import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  ALL_USERS,
  CREATE_PASSENGER,
  DELETE_PASSENGER,
  GET_PASSENGERS_BY_TYPE,
  UPDATE_PASSENGER,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerModel from './passenger/models/PassengerModel';

export const addTagTypes = ['passengers'];
const PassengerApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengers: build.query({
        query: (parameter) => ({
          url: GET_PASSENGERS_BY_TYPE,
          params: parameter,
        }),
        providesTags: ['passengers'],
      }),
      deletePassengers: build.mutation({
        query: (passengerIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: passengerIds,
        }),
        invalidatesTags: ['passengers'],
      }),
      getPassenger: build.query({
        query: (passengerId) => ({
          url: `${GET_PASSENGERS_BY_TYPE}${passengerId}`,
        }),
        providesTags: ['passengers'],
      }),
      createPassenger: build.mutation({
        query: (newPassenger) => ({
          url: CREATE_PASSENGER,
          method: 'POST',
          data: jsonToFormData(PassengerModel(newPassenger)),
        }),
        invalidatesTags: ['passengers'],
      }),
      updatePassenger: build.mutation({
        query: (passenger) => ({
          url: `${UPDATE_PASSENGER}${passenger.id}`,
          method: 'PUT',
          data: jsonToFormData(passenger),
        }),
        invalidatesTags: ['passengers'],
      }),
      deletePassenger: build.mutation({
        query: (passengerId) => ({
          url: `${DELETE_PASSENGER}${passengerId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['passengers'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerApi;
export const {
  useGetPassengersQuery,
  useDeletePassengersMutation,
  useGetPassengerQuery,
  useUpdatePassengerMutation,
  useDeletePassengerMutation,

  useCreatePassengerMutation,
} = PassengerApi;

export const selectFilteredPassengers = (passengers) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengers;
    }

    return FuseUtils.filterArrayByString(passengers, searchText);
  });
