import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_VISA_STAMP_OK_LIST,
  GET_VISA_STAMP_OK_LIST_WITHOUT_PG,
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
          url: GET_VISA_STAMP_OK_LIST,
          params: filterData,
        }),
        providesTags: ['visaStampOkReports'],
      }),
      getVisaStampOkAllReports: build.query({
        query: (filterData) => ({
          url: GET_VISA_STAMP_OK_LIST_WITHOUT_PG,
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
