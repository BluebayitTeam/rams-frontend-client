import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  EMBASSY_FILTER_BY,
  EMBASSY_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['embassyReports'];
const EmbassyReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbassyReports: build.query({
        query: (filterData) => ({
          url: EMBASSY_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['embassyReports'],
      }),
      getEmbassyAllReports: build.query({
        query: (filterData) => ({
          url: EMBASSY_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['embassyReports'],
      }),
    }),
    overrideExisting: false,
  });
export default EmbassyReportApi;
export const { useGetEmbassyReportsQuery, useGetEmbassyAllReportsQuery } =
  EmbassyReportApi;

export const selectFilteredEmbassyReports = (embassyReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return embassyReports;
    }

    return FuseUtils.filterArrayByString(embassyReports, searchText);
  });
