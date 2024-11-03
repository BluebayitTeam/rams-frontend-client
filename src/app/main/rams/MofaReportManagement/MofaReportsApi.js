import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  EMBASSY_FILTER_BY,
  EMBASSY_FILTER_WITHOUT_PG,
  MOFA_FILTER_BY,
  MOFA_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['mofaReports'];
const MofaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMofaReports: build.query({
        query: (filterData) => ({
          url: MOFA_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['mofaReports'],
      }),
      getMofaAllReports: build.query({
        query: (filterData) => ({
          url: MOFA_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['mofaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MofaReportApi;
export const { useGetMofaReportsQuery, useGetMofaAllReportsQuery } =
  MofaReportApi;

export const selectFilteredMofaReports = (mofaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return mofaReports;
    }

    return FuseUtils.filterArrayByString(mofaReports, searchText);
  });
