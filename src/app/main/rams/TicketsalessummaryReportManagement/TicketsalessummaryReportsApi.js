import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  GET_IATA_TICKET_SALES_SUMMARY_REPORT,
  RECEIPT_FILTER_BY,
  RECEIPT_FILTER_WITHOUT_PG,
  TICKETSALES_FILTER_BY,
  TICKETSALES_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ticketsalessummaryReports'];
const TicketsalessummaryReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketsalessummaryReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_SALES_SUMMARY_REPORT,
          params: filterData,
        }),
        providesTags: ['ticketsalessummaryReports'],
      }),
      getTicketsalessummaryAllReports: build.query({
        query: (filterData) => ({
          url: GET_IATA_TICKET_SALES_SUMMARY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['ticketsalessummaryReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketsalessummaryReportApi;
export const {
  useGetTicketsalessummaryReportsQuery,
  useGetTicketsalessummaryAllReportsQuery,
  useDeleteTicketsalessummaryReportsMutation,
  useGetTicketsalessummaryReportQuery,
  useUpdateTicketsalessummaryReportMutation,
  useDeleteTicketsalessummaryReportMutation,
  useCreateTicketsalessummaryReportMutation,
} = TicketsalessummaryReportApi;

export const selectFilteredTicketsalessummaryReports = (
  ticketsalessummaryReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketsalessummaryReports;
    }

    return FuseUtils.filterArrayByString(ticketsalessummaryReports, searchText);
  });
