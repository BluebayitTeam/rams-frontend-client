import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_PASSENGERTYPE,
  DELETE_PASSENGERTYPE,
  DELETE_PASSENGERTYPE_MULTIPLE,
  GET_PASSENGERTYPES,
  GET_PASSENGERTYPE_BY_ID,
  UPDATE_PASSENGERTYPE,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerTypeModel from './passengerType/models/PassengerTypeModel';

export const addTagTypes = ['passengerTypes'];
const PassengerTypeApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerTypes: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PASSENGERTYPES,
          params: { page, size, searchKey },
        }),
        providesTags: ['passengerTypes'],
      }),
      deletePassengerTypes: build.mutation({
        query: (passengerTypeIds) => ({
          url: DELETE_PASSENGERTYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: passengerTypeIds },
        }),
        invalidatesTags: ['passengerTypes'],
      }),
      getPassengerType: build.query({
        query: (passengerTypeId) => ({
          url: `${GET_PASSENGERTYPE_BY_ID}${passengerTypeId}`,
        }),
        providesTags: ['passengerTypes'],
      }),
      createPassengerType: build.mutation({
        query: (newPassengerType) => ({
          url: CREATE_PASSENGERTYPE,
          method: 'POST',
          data: jsonToFormData(PassengerTypeModel(newPassengerType)),
        }),
        invalidatesTags: ['passengerTypes'],
      }),
      updatePassengerType: build.mutation({
        query: (passengerType) => ({
          url: `${UPDATE_PASSENGERTYPE}${passengerType.id}`,
          method: 'PUT',
          data: jsonToFormData(passengerType),
        }),
        invalidatesTags: ['passengerTypes'],
      }),
      deletePassengerType: build.mutation({
        query: (passengerTypeId) => ({
          url: `${DELETE_PASSENGERTYPE}${passengerTypeId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['passengerTypes'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerTypeApi;
export const {
  useGetPassengerTypesQuery,
  useDeletePassengerTypesMutation,
  useGetPassengerTypeQuery,
  useUpdatePassengerTypeMutation,
  useDeletePassengerTypeMutation,

  useCreatePassengerTypeMutation,
} = PassengerTypeApi;

export const selectFilteredPassengerTypes = (passengerTypes) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerTypes;
    }

    return FuseUtils.filterArrayByString(passengerTypes, searchText);
  });
