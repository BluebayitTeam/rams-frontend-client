import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT,
  GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['embassyExpireReports'];
const EmbassyExpireReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbassyExpireReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['embassyExpireReports'],
      }),
      getEmbassyExpireAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_EMBASSY_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['embassyExpireReports'],
      }),
    }),
    overrideExisting: false,
  });
export default EmbassyExpireReportApi;
export const {
  useGetEmbassyExpireReportsQuery,
  useGetEmbassyExpireAllReportsQuery,
} = EmbassyExpireReportApi;

export const selectFilteredEmbassyExpireReports = (embassyExpireReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return embassyExpireReports;
    }

    return FuseUtils.filterArrayByString(embassyExpireReports, searchText);
  });
