import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  POSTDATE_FILTER_BY,
  POSTDATE_FILTER_WITHOUT_PG,
  BALANCESHEET__FILTER_WITHOUT_PG,
  BALANCESHEET_FILTER_BY,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['balanceSheetReports'];
const BalanceSheetReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getBalanceSheetReports: build.query({
        query: (filterData) => ({
          url: BALANCESHEET_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['balanceSheetReports'],
      }),
      getBalanceSheetAllReports: build.query({
        query: (filterData) => ({
          url: BALANCESHEET__FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['balanceSheetReports'],
      }),
    }),
    overrideExisting: false,
  });
export default BalanceSheetReportApi;
export const {
  useGetBalanceSheetReportsQuery,
  useGetBalanceSheetAllReportsQuery,
} = BalanceSheetReportApi;

export const selectFilteredBalanceSheetReports = (balanceSheetReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return balanceSheetReports;
    }

    return FuseUtils.filterArrayByString(balanceSheetReports, searchText);
  });
