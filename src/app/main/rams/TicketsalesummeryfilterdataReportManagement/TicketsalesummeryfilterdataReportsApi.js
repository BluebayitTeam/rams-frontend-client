import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_IATA_TICKET_SALES_SUMMARY_REPORT,
  GET_IATA_TICKET_SALES_SUMMARY_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketsalesummeryfilterdataReports'];
const TicketsalesummeryfilterdataReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketsalesummeryfilterdataReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_SALES_SUMMARY_REPORT,
          params: filterData,
        }),
        providesTags: ['ticketsalesummeryfilterdataReports'],
      }),
      getTicketsalesummeryfilterdataAllReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_SALES_SUMMARY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketsalesummeryfilterdataReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketsalesummeryfilterdataReportApi;
export const {
  useGetTicketsalesummeryfilterdataReportsQuery,
  useGetTicketsalesummeryfilterdataAllReportsQuery,
} = TicketsalesummeryfilterdataReportApi;

export const selectFilteredTicketsalesummeryfilterdataReports = (
  ticketsalesummeryfilterdataReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketsalesummeryfilterdataReports;
    }

    return FuseUtils.filterArrayByString(
      ticketsalesummeryfilterdataReports,
      searchText
    );
  });
