import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  AGENT_FILTER_BY,
  AGENT_FILTER_WITHOUT_PG,
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  GET_EMBASSY_LOG,
  GET_FLIGHT_LOG,
  GET_MANPOWER_LOG,
  GET_MEDICAL_LOG,
  GET_MOFA_LOG,
  GET_PASSENGER_LOG,
  UPDATE_DEPARTMENT,
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
        query: ({ manpowerEditHistorysId, page, size }) => ({
          url: `${GET_MANPOWER_LOG}${manpowerEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['manpowerEditHistorys'],
      }),
      getEmbassyEditHistorys: build.query({
        query: ({ embassyEditHistorysId, page, size }) => ({
          url: `${GET_EMBASSY_LOG}${embassyEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['embassyEditHistorys'],
      }),
      getFlightEditHistorys: build.query({
        query: ({ flightEditHistorysId, page, size }) => ({
          url: `${GET_FLIGHT_LOG}${flightEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['flightEditHistorys'],
      }),
      getMedicalEditHistorys: build.query({
        query: ({ medicalEditHistorysId, page, size }) => ({
          url: `${GET_MEDICAL_LOG}${medicalEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['medicalEditHistorys'],
      }),
      getMofaEditHistorys: build.query({
        query: ({ mofaEditHistorysId, page, size }) => ({
          url: `${GET_MOFA_LOG}${mofaEditHistorysId}`,
          params: { page, size },
        }),
        providesTags: ['mofaEditHistorys'],
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
} = PassengerEditHistoryApi;

export const selectFilteredPassengerEditHistorys = (passengerEditHistorys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerEditHistorys;
    }

    return FuseUtils.filterArrayByString(passengerEditHistorys, searchText);
  });
