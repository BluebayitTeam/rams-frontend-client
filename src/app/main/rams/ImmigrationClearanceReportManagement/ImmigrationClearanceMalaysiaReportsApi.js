import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['immigrationclearanceMalaysiaReports'];
const ImmigrationClearanceMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getImmigrationClearanceMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['immigrationclearanceMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default ImmigrationClearanceMalaysiaReportApi;
export const { useGetImmigrationClearanceMalaysiaReportsQuery } =
  ImmigrationClearanceMalaysiaReportApi;

export const selectFilteredImmigrationClearanceMalaysiaReports = (
  immigrationclearanceMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return immigrationclearanceMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      immigrationclearanceMalaysiaReports,
      searchText
    );
  });
