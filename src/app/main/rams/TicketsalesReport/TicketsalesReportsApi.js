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
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketsalesReports'];
const TicketsalesReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketsalesReports: build.query({
        query: (filterData) => ({
          url: RECEIPT_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['ticketsalesReports'],
      }),
      getTicketsalesAllReports: build.query({
        query: (filterData) => ({
          url: RECEIPT_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketsalesReports'],
      }),
      deleteTicketsalesReports: build.mutation({
        query: (ticketsalesReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: ticketsalesReportIds },
        }),
        invalidatesTags: ['ticketsalesReports'],
      }),
      getTicketsalesReport: build.query({
        query: (ticketsalesReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${ticketsalesReportId}`,
        }),
        providesTags: ['ticketsalesReports'],
      }),
      createTicketsalesReport: build.mutation({
        query: (newTicketsalesReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newTicketsalesReport),
        }),
        invalidatesTags: ['ticketsalesReports'],
      }),
      updateTicketsalesReport: build.mutation({
        query: (ticketsalesReport) => ({
          url: `${UPDATE_DEPARTMENT}${ticketsalesReport.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketsalesReport),
        }),
        invalidatesTags: ['ticketsalesReports'],
      }),
      deleteTicketsalesReport: build.mutation({
        query: (ticketsalesReportId) => ({
          url: `${DELETE_DEPARTMENT}${ticketsalesReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketsalesReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketsalesReportApi;
export const {
  useGetTicketsalesReportsQuery,
  useGetTicketsalesAllReportsQuery,
  useDeleteTicketsalesReportsMutation,
  useGetTicketsalesReportQuery,
  useUpdateTicketsalesReportMutation,
  useDeleteTicketsalesReportMutation,
  useCreateTicketsalesReportMutation,
} = TicketsalesReportApi;

export const selectFilteredTicketsalesReports = (ticketsalesReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketsalesReports;
    }

    return FuseUtils.filterArrayByString(ticketsalesReports, searchText);
  });
