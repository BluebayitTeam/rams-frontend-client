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

export const addTagTypes = ['ticketrefundReports'];
const TicketrefundReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketrefundReports: build.query({
        query: (filterData) => ({
          url: TICKETSALES_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['ticketrefundReports'],
      }),
      getTicketrefundAllReports: build.query({
        query: (filterData) => ({
          url: TICKETSALES_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketrefundReports'],
      }),
      deleteTicketrefundReports: build.mutation({
        query: (ticketrefundReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: ticketrefundReportIds },
        }),
        invalidatesTags: ['ticketrefundReports'],
      }),
      getTicketrefundReport: build.query({
        query: (ticketrefundReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${ticketrefundReportId}`,
        }),
        providesTags: ['ticketrefundReports'],
      }),
      createTicketrefundReport: build.mutation({
        query: (newTicketrefundReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newTicketrefundReport),
        }),
        invalidatesTags: ['ticketrefundReports'],
      }),
      updateTicketrefundReport: build.mutation({
        query: (ticketrefundReport) => ({
          url: `${UPDATE_DEPARTMENT}${ticketrefundReport.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketrefundReport),
        }),
        invalidatesTags: ['ticketrefundReports'],
      }),
      deleteTicketrefundReport: build.mutation({
        query: (ticketrefundReportId) => ({
          url: `${DELETE_DEPARTMENT}${ticketrefundReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketrefundReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketrefundReportApi;
export const {
  useGetTicketrefundReportsQuery,
  useGetTicketrefundAllReportsQuery,
  useDeleteTicketrefundReportsMutation,
  useGetTicketrefundReportQuery,
  useUpdateTicketrefundReportMutation,
  useDeleteTicketrefundReportMutation,
  useCreateTicketrefundReportMutation,
} = TicketrefundReportApi;

export const selectFilteredTicketrefundReports = (ticketrefundReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketrefundReports;
    }

    return FuseUtils.filterArrayByString(ticketrefundReports, searchText);
  });
