import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
  GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT,
  GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketSaleReports'];
const TicketSaleReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketSaleReports: build.query({
        query: (filterData) => ({
          url: GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT,
          params: filterData,
        }),
        providesTags: ['ticketSaleReports'],
      }),
      getTicketSaleAllReports: build.query({
        query: (filterData) => ({
          url: GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketSaleReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketSaleReportApi;
export const { useGetTicketSaleReportsQuery, useGetTicketSaleAllReportsQuery } =
  TicketSaleReportApi;

export const selectFilteredTicketSaleReports = (ticketSaleReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketSaleReports;
    }

    return FuseUtils.filterArrayByString(ticketSaleReports, searchText);
  });
