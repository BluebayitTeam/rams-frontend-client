import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT,
  GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';

export const addTagTypes = ['ticketSaleDashboardReports'];
const TicketSaleDashboardReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketSaleDashboardReports: build.query({
        query: (filterData) => ({
          url: GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT,
          params: filterData,
        }),
        providesTags: ['ticketSaleDashboardReports'],
      }),
      getTicketSaleDashboardAllReports: build.query({
        query: (filterData) => ({
          url: GET_TICKET_SALES_REPORT_FOR_DASHBOARD_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketSaleDashboardReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketSaleDashboardReportApi;
export const {
  useGetTicketSaleDashboardReportsQuery,
  useGetTicketSaleDashboardAllReportsQuery,
} = TicketSaleDashboardReportApi;

export const selectFilteredTicketSaleDashboardReports = (
  ticketSaleDashboardReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketSaleDashboardReports;
    }

    return FuseUtils.filterArrayByString(
      ticketSaleDashboardReports,
      searchText
    );
  });
