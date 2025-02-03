import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_SALES_TICKET_REPORT,
  GET_SALES_TICKET_REPORT_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['TotalSalesReports'];
const TotalSalesReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTotalSalesReports: build.query({
        query: (filterData) => ({
          url: GET_SALES_TICKET_REPORT,
          params: filterData,
        }),
        providesTags: ['TotalSalesReports'],
      }),
      getTotalSalesAllReports: build.query({
        query: (filterData) => ({
          url: GET_SALES_TICKET_REPORT_WP,
          params: filterData,
        }),
        providesTags: ['TotalSalesReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TotalSalesReportApi;
export const { useGetTotalSalesReportsQuery, useGetTotalSalesAllReportsQuery } =
  TotalSalesReportApi;

export const selectFilteredTotalSalesReports = (TotalSalesReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return TotalSalesReports;
    }

    return FuseUtils.filterArrayByString(TotalSalesReports, searchText);
  });
