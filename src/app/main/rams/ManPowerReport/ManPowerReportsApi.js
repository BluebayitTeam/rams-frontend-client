import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  MANPOWER_FILTER_BY,
  MANPOWER_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['manPowerReports'];
const ManPowerReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getManPowerReports: build.query({
        query: (filterData) => ({
          url: MANPOWER_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['manPowerReports'],
      }),
      getManPowerAllReports: build.query({
        query: (filterData) => ({
          url: MANPOWER_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['manPowerReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ManPowerReportApi;
export const { useGetManPowerReportsQuery, useGetManPowerAllReportsQuery } =
  ManPowerReportApi;

export const selectFilteredManPowerReports = (manPowerReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return manPowerReports;
    }

    return FuseUtils.filterArrayByString(manPowerReports, searchText);
  });
