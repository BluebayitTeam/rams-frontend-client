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
        query: (filterData) => ({
          url: GET_PASSENGER_LOG,
          params: filterData,
        }),
        providesTags: ['passengerEditHistorys'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerEditHistoryApi;
export const {
  useGetPassengerEditHistorysQuery,
  useGetAgentAllReportsQuery,
  useDeletePassengerEditHistorysMutation,
  useGetPassengerEditHistoryQuery,
  useUpdatePassengerEditHistoryMutation,
  useDeletePassengerEditHistoryMutation,
  useCreatePassengerEditHistoryMutation,
} = PassengerEditHistoryApi;

export const selectFilteredPassengerEditHistorys = (passengerEditHistorys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerEditHistorys;
    }

    return FuseUtils.filterArrayByString(passengerEditHistorys, searchText);
  });
