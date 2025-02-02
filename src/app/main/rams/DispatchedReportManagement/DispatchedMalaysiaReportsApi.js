import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['dispatchedMalaysiaReports'];
const DispatchedMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getDispatchedMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['dispatchedMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default DispatchedMalaysiaReportApi;
export const { useGetDispatchedMalaysiaReportsQuery } =
  DispatchedMalaysiaReportApi;

export const selectFilteredDispatchedMalaysiaReports = (
  dispatchedMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return dispatchedMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(dispatchedMalaysiaReports, searchText);
  });
