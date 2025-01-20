import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_MANPOWER_WAITING_LIST,
  GET_MANPOWER_WAITING_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['manpowerWaitingReports'];
const ManpowerWaitingReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getManpowerWaitingReports: build.query({
        query: (filterData) => ({
          url: GET_MANPOWER_WAITING_LIST,
          params: filterData,
        }),
        providesTags: ['manpowerWaitingReports'],
      }),
      getManpowerWaitingAllReports: build.query({
        query: (filterData) => ({
          url: GET_MANPOWER_WAITING_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['manpowerWaitingReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ManpowerWaitingReportApi;
export const {
  useGetManpowerWaitingReportsQuery,
  useGetManpowerWaitingAllReportsQuery,
} = ManpowerWaitingReportApi;

export const selectFilteredManpowerWaitingReports = (manpowerWaitingReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return manpowerWaitingReports;
    }

    return FuseUtils.filterArrayByString(manpowerWaitingReports, searchText);
  });
