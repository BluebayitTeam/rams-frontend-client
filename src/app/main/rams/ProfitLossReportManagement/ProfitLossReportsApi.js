import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import { selectSearchText } from './store/searchTextSlice';
import {
  PROFITLOSS__FILTER_WITHOUT_PG,
  PROFITLOSS_FILTER_BY,
} from 'src/app/constant/constants';

export const addTagTypes = ['profitLossReports'];
const ProfitLossReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProfitLossReports: build.query({
        query: (filterData) => ({
          url: PROFITLOSS_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['profitLossReports'],
      }),
      getProfitLossAllReports: build.query({
        query: (filterData) => ({
          url: PROFITLOSS__FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['profitLossReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ProfitLossReportApi;
export const { useGetProfitLossReportsQuery, useGetProfitLossAllReportsQuery } =
  ProfitLossReportApi;

export const selectFilteredProfitLossReports = (profitLossReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return profitLossReports;
    }

    return FuseUtils.filterArrayByString(profitLossReports, searchText);
  });
