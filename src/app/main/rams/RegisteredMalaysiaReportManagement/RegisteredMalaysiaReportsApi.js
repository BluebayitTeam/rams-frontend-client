import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_MALAYSIA_DASHBOARD,
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_MALAYSIA_DASHBOARD_WP,
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD,
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['registeredMalaysiaReports'];
const RegisteredMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getRegisteredMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_MALAYSIA_DASHBOARD,
          params: filterData,
        }),
        providesTags: ['registeredMalaysiaReports'],
      }),
      getRegisteredMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_MALAYSIA_DASHBOARD_WP,
          params: filterData,
        }),
        providesTags: ['registeredMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default RegisteredMalaysiaReportApi;
export const {
  useGetRegisteredMalaysiaReportsQuery,
  useGetRegisteredMalaysiaAllReportsQuery,
} = RegisteredMalaysiaReportApi;

export const selectFilteredRegisteredMalaysiaReports = (
  registeredMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return registeredMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(registeredMalaysiaReports, searchText);
  });
