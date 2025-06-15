import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  ALL_USERS,
  CREATE_PASSENGER,
  CREATE_PASSENGER_DATA_FROM_IMAGE,
  DELETE_PASSENGER,
  GET_PASSENGERS_BY_TYPE,
  GET_PASSENGER_BY_ID,
  UPDATE_PASSENGER,
} from 'src/app/constant/constants';
import PassengerModel from './Passenger/models/PassengerModel';
import { selectSearchText } from './store/searchTextSlice';

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
          url: `${GET_PASSENGER_BY_ID}${passengerId}`,
        }),
        providesTags: ['passengers'],
      }),
      createPassenger: build.mutation({
        query: (newPassenger) => ({
          url: CREATE_PASSENGER,
          method: 'POST',
          data: jsonToFormData(
            PassengerModel({
              ...newPassenger,
              passenger_type: newPassenger.passenger_type,
            })
          ),
        }),
        invalidatesTags: ['passengers'],
      }),
      createPassengerImage: build.mutation({
        query: (passengerImageData) => ({
          url: CREATE_PASSENGER_DATA_FROM_IMAGE,
          method: 'POST',
          data: jsonToFormData({ image: passengerImageData }),
        }),
        invalidatesTags: ['passengers'],
      }),
      updatePassenger: build.mutation({
        query: (passenger) => ({
          url: `${UPDATE_PASSENGER}${passenger.id}`, // Removed passenger.passenger_type from URL
          method: 'PUT',
          data: jsonToFormData({
            ...passenger,
            passenger_type: passenger.passenger_type, // Ensuring it's in the payload, not in the URL
          }),
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
  useCreatePassengerImageMutation,
} = PassengerApi;

export const selectFilteredPassengers = (passengers) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengers;
    }

    return FuseUtils.filterArrayByString(passengers, searchText);
  });
