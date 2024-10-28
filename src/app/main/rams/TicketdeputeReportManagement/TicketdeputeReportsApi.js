import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  GET_IATA_TICKET_DEPUTE_REPORT,
  GET_IATA_TICKET_DEPUTE_REPORT_WP,
  GET_IATA_TICKET_REFUND_REPORT,
  GET_IATA_TICKET_REFUND_REPORT_WITHOUT_PG,
  RECEIPT_FILTER_BY,
  RECEIPT_FILTER_WITHOUT_PG,
  TICKETSALES_FILTER_BY,
  TICKETSALES_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketdeputeReports'];
const TicketdeputeReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketdeputeReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_DEPUTE_REPORT,
          params: filterData,
        }),
        providesTags: ['ticketdeputeReports'],
      }),
      getTicketdeputeAllReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_DEPUTE_REPORT_WP,
          params: filterData,
        }),
        providesTags: ['ticketdeputeReports'],
      }),
      deleteTicketdeputeReports: build.mutation({
        query: (ticketdeputeReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: ticketdeputeReportIds },
        }),
        invalidatesTags: ['ticketdeputeReports'],
      }),
      getTicketdeputeReport: build.query({
        query: (ticketdeputeReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${ticketdeputeReportId}`,
        }),
        providesTags: ['ticketdeputeReports'],
      }),
      createTicketdeputeReport: build.mutation({
        query: (newTicketdeputeReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newTicketdeputeReport),
        }),
        invalidatesTags: ['ticketdeputeReports'],
      }),
      updateTicketdeputeReport: build.mutation({
        query: (ticketdeputeReport) => ({
          url: `${UPDATE_DEPARTMENT}${ticketdeputeReport.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketdeputeReport),
        }),
        invalidatesTags: ['ticketdeputeReports'],
      }),
      deleteTicketdeputeReport: build.mutation({
        query: (ticketdeputeReportId) => ({
          url: `${DELETE_DEPARTMENT}${ticketdeputeReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketdeputeReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketdeputeReportApi;
export const {
  useGetTicketdeputeReportsQuery,
  useGetTicketdeputeAllReportsQuery,
  useDeleteTicketdeputeReportsMutation,
  useGetTicketdeputeReportQuery,
  useUpdateTicketdeputeReportMutation,
  useDeleteTicketdeputeReportMutation,
  useCreateTicketdeputeReportMutation,
} = TicketdeputeReportApi;

export const selectFilteredTicketdeputeReports = (ticketdeputeReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketdeputeReports;
    }

    return FuseUtils.filterArrayByString(ticketdeputeReports, searchText);
  });
