import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD,
  GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['musanedReportReports'];
const MusanedReportReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMusanedReportReports: build.query({
        query: (filterData) => ({
          url: GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD,
          params: filterData,
        }),
        providesTags: ['musanedReportReports'],
      }),
      getMusanedReportAllReports: build.query({
        query: (filterData) => ({
          url: GET_MUSANED_REPORT_FOR_SAUDI_DASHBOARD_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['musanedReportReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MusanedReportReportApi;
export const {
  useGetMusanedReportReportsQuery,
  useGetMusanedReportAllReportsQuery,
} = MusanedReportReportApi;

export const selectFilteredMusanedReportReports = (musanedReportReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return musanedReportReports;
    }

    return FuseUtils.filterArrayByString(musanedReportReports, searchText);
  });
