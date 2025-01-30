import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import {
  GET_DASHBOARD_FOR_MALAYSIA,
  GET_DASHBOARD_FOR_TRANING_MALAYSIA,
} from 'src/app/constant/constants';

export const addTagTypes = ['traningMalaysiaReports'];
const TraningMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTraningMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_TRANING_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['traningMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TraningMalaysiaReportApi;
export const { useGetTraningMalaysiaReportsQuery } = TraningMalaysiaReportApi;

export const selectFilteredTraningMalaysiaReports = (traningMalaysiaReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return traningMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(traningMalaysiaReports, searchText);
  });
