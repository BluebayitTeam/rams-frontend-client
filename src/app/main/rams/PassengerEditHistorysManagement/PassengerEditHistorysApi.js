import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  GET_EMBASSY_LOG,
  GET_FLIGHT_LOG,
  GET_MANPOWER_LOG,
  GET_MEDICAL_LOG,
  GET_MOFA_LOG,
  GET_MUSANED_OKALA_LOG,
  GET_OFFICE_WORK_LOG,
  GET_PASSENGER_LOG,
  GET_TRAINING_LOG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerEditHistorys'];
const PassengerEditHistoryApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_PASSENGER_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['passengerEditHistorys'],
      }),
      getManpowerEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_MANPOWER_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['manpowerEditHistorys'],
      }),
      getEmbassyEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_EMBASSY_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['embassyEditHistorys'],
      }),
      getFlightEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_FLIGHT_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['flightEditHistorys'],
      }),
      getMedicalEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_MEDICAL_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['medicalEditHistorys'],
      }),
      getMofaEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_MOFA_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['mofaEditHistorys'],
      }),
      getMusanedOkalaEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_MUSANED_OKALA_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['musanedOkalaEditHistorys'],
      }),
      getOfficeWorkEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_OFFICE_WORK_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['officeWorkEditHistorys'],
      }),
      getTrainingEditHistorys: build.query({
        query: ({ passengerEditHistorysId, page, size }) => ({
          url: `${GET_TRAINING_LOG}${passengerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['trainingEditHistorys'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerEditHistoryApi;
export const {
  useGetPassengerEditHistorysQuery,
  useGetManpowerEditHistorysQuery,
  useGetEmbassyEditHistorysQuery,
  useGetFlightEditHistorysQuery,
  useGetMedicalEditHistorysQuery,
  useGetMofaEditHistorysQuery,
  useGetMusanedOkalaEditHistorysQuery,
  useGetOfficeWorkEditHistorysQuery,
  useGetTrainingEditHistorysQuery,
} = PassengerEditHistoryApi;

export const selectFilteredPassengerEditHistorys = (passengerEditHistorys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerEditHistorys;
    }

    return FuseUtils.filterArrayByString(passengerEditHistorys, searchText);
  });
