import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  RECEIPT_FILTER_BY,
  RECEIPT_FILTER_WITHOUT_PG,
  TICKETSALES_FILTER_BY,
  TICKETSALES_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketPurchasesReports'];
const TicketPurchasesReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketPurchasesReports: build.query({
        query: (filterData) => ({
          url: TICKETSALES_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['ticketPurchasesReports'],
      }),
      getTicketPurchasesAllReports: build.query({
        query: (filterData) => ({
          url: TICKETSALES_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketPurchasesReports'],
      }),
      deleteTicketPurchasesReports: build.mutation({
        query: (ticketPurchasesReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: ticketPurchasesReportIds },
        }),
        invalidatesTags: ['ticketPurchasesReports'],
      }),
      getTicketPurchasesReport: build.query({
        query: (ticketPurchasesReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${ticketPurchasesReportId}`,
        }),
        providesTags: ['ticketPurchasesReports'],
      }),
      createTicketPurchasesReport: build.mutation({
        query: (newTicketPurchasesReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newTicketPurchasesReport),
        }),
        invalidatesTags: ['ticketPurchasesReports'],
      }),
      updateTicketPurchasesReport: build.mutation({
        query: (ticketPurchasesReport) => ({
          url: `${UPDATE_DEPARTMENT}${ticketPurchasesReport.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketPurchasesReport),
        }),
        invalidatesTags: ['ticketPurchasesReports'],
      }),
      deleteTicketPurchasesReport: build.mutation({
        query: (ticketPurchasesReportId) => ({
          url: `${DELETE_DEPARTMENT}${ticketPurchasesReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketPurchasesReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketPurchasesReportApi;
export const {
  useGetTicketPurchasesReportsQuery,
  useGetTicketPurchasesAllReportsQuery,
  useDeleteTicketPurchasesReportsMutation,
  useGetTicketPurchasesReportQuery,
  useUpdateTicketPurchasesReportMutation,
  useDeleteTicketPurchasesReportMutation,
  useCreateTicketPurchasesReportMutation,
} = TicketPurchasesReportApi;

export const selectFilteredTicketPurchasesReports = (ticketPurchasesReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketPurchasesReports;
    }

    return FuseUtils.filterArrayByString(ticketPurchasesReports, searchText);
  });
