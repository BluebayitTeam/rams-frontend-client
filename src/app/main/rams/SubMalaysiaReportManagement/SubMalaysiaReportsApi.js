import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_DASHBOARD_FOR_MALAYSIA,
  GET_DASHBOARD_FOR_MALAYSIA_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['subMalaysiaReports'];
const SubMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSubMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['subMalaysiaReports'],
      }),
      getSubMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA_WP,
          params: filterData,
        }),
        providesTags: ['subMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default SubMalaysiaReportApi;
export const {
  useGetSubMalaysiaReportsQuery,
  useGetSubMalaysiaAllReportsQuery,
} = SubMalaysiaReportApi;

export const selectFilteredSubMalaysiaReports = (subMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return subMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(subMalaysiaReports, searchText);
  });
