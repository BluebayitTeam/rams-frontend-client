import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import {
  TICKET_FOR_CALLING_DATA_REPORT,
  TICKET_FOR_CALLING_DATA_REPORT_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['TicketMalaysiaReports'];
const TicketMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketMalaysiaReports: build.query({
        query: (filterData) => ({
          url: TICKET_FOR_CALLING_DATA_REPORT,
          params: filterData,
        }),
        providesTags: ['TicketMalaysiaReports'],
      }),
      getTicketMalaysiaAllReports: build.query({
        query: (filterData) => ({
          url: TICKET_FOR_CALLING_DATA_REPORT_WP,
          params: filterData,
        }),
        providesTags: ['TicketMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketMalaysiaReportApi;
export const {
  useGetTicketMalaysiaReportsQuery,
  useGetTicketMalaysiaAllReportsQuery,
} = TicketMalaysiaReportApi;

export const selectFilteredTicketMalaysiaReports = (TicketMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return TicketMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(TicketMalaysiaReports, searchText);
  });
