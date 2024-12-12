import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  ALL_USERS,
  CREATE_CLIENT,
  GET_CLIENTS,
  GET_REPORT_COLUMN_BY_ID,
  UPDATE_REPORT_COLUMN,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerSummaryUpdateClmModel from './passengerSummaryUpdateClm/models/PassengerSummaryUpdateClmModel';

export const addTagTypes = ['passengerSummaryUpdateClms'];
const PassengerSummaryUpdateClmApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerSummaryUpdateClms: build.query({
        query: () => ({ url: GET_CLIENTS }),
        providesTags: ['passengerSummaryUpdateClms'],
      }),

      deletePassengerSummaryUpdateClms: build.mutation({
        query: (passengerSummaryUpdateClmIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: passengerSummaryUpdateClmIds,
        }),
        invalidatesTags: ['passengerSummaryUpdateClms'],
      }),

      getPassengerSummaryUpdateClm: build.query({
        query: (passengerSummaryUpdateClmId) => ({
          url: `${GET_REPORT_COLUMN_BY_ID}${passengerSummaryUpdateClmId}`,
        }),
        providesTags: ['passengerSummaryUpdateClms'],
      }),
      updatePassengerSummaryUpdateClm: build.mutation({
        query: (data) => ({
          url: `${UPDATE_REPORT_COLUMN}${data?.type}`,
          method: 'PUT',
          data,
        }),

        invalidatesTags: ['passengerSummaryUpdateClms'],
      }),
      createPassengerSummaryUpdateClm: build.mutation({
        query: (newPassengerSummaryUpdateClm) => ({
          url: CREATE_CLIENT,
          method: 'POST',
          data: jsonToFormData(PassengerSummaryUpdateClmModel(newPassengerSummaryUpdateClm)),
        }),
        invalidatesTags: ['passengerSummaryUpdateClms'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerSummaryUpdateClmApi;
export const {
  useGetPassengerSummaryUpdateClmsQuery,
  useDeletePassengerSummaryUpdateClmsMutation,
  useGetPassengerSummaryUpdateClmQuery,
  useUpdatePassengerSummaryUpdateClmMutation,
  useDeletePassengerSummaryUpdateClmMutation,
  useCreatePassengerSummaryUpdateClmMutation,
} = PassengerSummaryUpdateClmApi;

export const selectFilteredPassengerSummaryUpdateClms = (passengerSummaryUpdateClms) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerSummaryUpdateClms;
    }

    return FuseUtils.filterArrayByString(passengerSummaryUpdateClms, searchText);
  });
