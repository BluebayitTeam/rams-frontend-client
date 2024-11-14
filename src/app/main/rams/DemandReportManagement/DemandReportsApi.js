import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  DEMAND_FILTER_BY,
  DEMAND_FILTER_BY_WP,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['demandReports'];
const DemandReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getDemandReports: build.query({
        query: (filterData) => ({
          url: DEMAND_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['demandReports'],
      }),
      getDemandAllReports: build.query({
        query: (filterData) => ({
          url: DEMAND_FILTER_BY_WP,
          params: filterData,
        }),
        providesTags: ['demandReports'],
      }),
    }),
    overrideExisting: false,
  });
export default DemandReportApi;
export const { useGetDemandReportsQuery, useGetDemandAllReportsQuery } =
  DemandReportApi;

export const selectFilteredDemandReports = (demandReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return demandReports;
    }

    return FuseUtils.filterArrayByString(demandReports, searchText);
  });
