import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CIRCULAR_FILTER_BY,
  CIRCULAR_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['circularReports'];
const CircularReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCircularReports: build.query({
        query: (filterData) => ({
          url: CIRCULAR_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['circularReports'],
      }),
      getCircularAllReports: build.query({
        query: (filterData) => ({
          url: CIRCULAR_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['circularReports'],
      }),
    }),
    overrideExisting: false,
  });
export default CircularReportApi;
export const { useGetCircularReportsQuery, useGetCircularAllReportsQuery } =
  CircularReportApi;

export const selectFilteredCircularReports = (circularReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return circularReports;
    }

    return FuseUtils.filterArrayByString(circularReports, searchText);
  });
