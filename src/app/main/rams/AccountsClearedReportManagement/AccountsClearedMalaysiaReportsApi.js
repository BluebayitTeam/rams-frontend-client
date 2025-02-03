import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_DASHBOARD_FOR_MALAYSIA,
  GET_DASHBOARD_FOR_MALAYSIA_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['accountsclearedMalaysiaReports'];
const AccountsClearedMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAccountsClearedMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['accountsclearedMalaysiaReports'],
      }),
      getAccountsClearedMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA_WP,
          params: filterData,
        }),
        providesTags: ['accountsclearedMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default AccountsClearedMalaysiaReportApi;
export const {
  useGetAccountsClearedMalaysiaReportsQuery,
  useGetAccountsClearedMalaysiaAllReportsQuery,
} = AccountsClearedMalaysiaReportApi;

export const selectFilteredAccountsClearedMalaysiaReports = (
  accountsclearedMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return accountsclearedMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      accountsclearedMalaysiaReports,
      searchText
    );
  });
