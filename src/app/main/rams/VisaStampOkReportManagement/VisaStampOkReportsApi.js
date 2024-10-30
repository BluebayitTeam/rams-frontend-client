import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_IATA_TICKET_SALES_SUMMARY_REPORT,
  GET_IATA_TICKET_SALES_SUMMARY_REPORT_WITHOUT_PG,
  GET_NOT_MEDICAL_LIST,
  GET_NOT_MEDICAL_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['visaStampOkReports'];
const VisaStampOkReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaStampOkReports: build.query({
        query: (filterData) => ({
          url: GET_NOT_MEDICAL_LIST,
          params: filterData,
        }),
        providesTags: ['visaStampOkReports'],
      }),
      getVisaStampOkAllReports: build.query({
        query: (filterData) => ({
          url: GET_NOT_MEDICAL_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['visaStampOkReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaStampOkReportApi;
export const {
  useGetVisaStampOkReportsQuery,
  useGetVisaStampOkAllReportsQuery,
} = VisaStampOkReportApi;

export const selectFilteredVisaStampOkReports = (visaStampOkReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaStampOkReports;
    }

    return FuseUtils.filterArrayByString(visaStampOkReports, searchText);
  });
