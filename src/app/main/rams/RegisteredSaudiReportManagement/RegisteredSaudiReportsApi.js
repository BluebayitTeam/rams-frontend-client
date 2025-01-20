import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD,
  GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['registeredSaudiReports'];
const RegisteredSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getRegisteredSaudiReports: build.query({
        query: (filterData) => ({
          url: GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD,
          params: filterData,
        }),
        providesTags: ['registeredSaudiReports'],
      }),
      getRegisteredSaudiAllReports: build.query({
        query: (filterData) => ({
          url: GET_REGISTERED_OR_ON_PROCESS_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['registeredSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default RegisteredSaudiReportApi;
export const {
  useGetRegisteredSaudiReportsQuery,
  useGetRegisteredSaudiAllReportsQuery,
} = RegisteredSaudiReportApi;

export const selectFilteredRegisteredSaudiReports = (registeredSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return registeredSaudiReports;
    }

    return FuseUtils.filterArrayByString(registeredSaudiReports, searchText);
  });
