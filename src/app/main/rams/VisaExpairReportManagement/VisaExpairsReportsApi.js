import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_NOTOFICATION_VISA_EXPIR,
  GET_NOTOFICATION_VISA_EXPIR_WP,
} from 'src/app/constant/constants';

export const addTagTypes = ['visaExpairsReports'];
const VisaExpairsReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaExpairsReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_VISA_EXPIR,
          params: filterData,
        }),
        providesTags: ['visaExpairsReports'],
      }),
      getVisaExpairsAllReports: build.query({
        query: (filterData) => ({
          url: GET_NOTOFICATION_VISA_EXPIR_WP,
          params: filterData,
        }),
        providesTags: ['visaExpairsReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaExpairsReportApi;
export const {
  useGetVisaExpairsReportsQuery,
  useGetVisaExpairsAllReportsQuery,
} = VisaExpairsReportApi;

export const selectFilteredVisaExpairsReports = (visaExpairsReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaExpairsReports;
    }

    return FuseUtils.filterArrayByString(visaExpairsReports, searchText);
  });
