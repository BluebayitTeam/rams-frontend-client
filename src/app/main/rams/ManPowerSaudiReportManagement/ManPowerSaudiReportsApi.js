import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import { MANPOWER_FILTER_SAUDI_BY } from 'src/app/constant/constants';

export const addTagTypes = ['manPowerSaudiReports'];
const ManPowerSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getManPowerSaudiReports: build.query({
        query: (filterData) => ({
          url: MANPOWER_FILTER_SAUDI_BY,
          params: filterData,
        }),
        providesTags: ['manPowerSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ManPowerSaudiReportApi;
export const { useGetManPowerSaudiReportsQuery } = ManPowerSaudiReportApi;

export const selectFilteredManPowerSaudiReports = (manPowerSaudiReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return manPowerSaudiReports;
    }

    return FuseUtils.filterArrayByString(manPowerSaudiReports, searchText);
  });
