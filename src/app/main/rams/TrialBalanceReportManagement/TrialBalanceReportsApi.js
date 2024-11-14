import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  POSTDATE_FILTER_BY,
  POSTDATE_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['trialBalanceReports'];
const TrialBalanceReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTrialBalanceReports: build.query({
        query: (filterData) => ({
          url: POSTDATE_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['trialBalanceReports'],
      }),
      getTrialBalanceAllReports: build.query({
        query: (filterData) => ({
          url: POSTDATE_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['trialBalanceReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TrialBalanceReportApi;
export const {
  useGetTrialBalanceReportsQuery,
  useGetTrialBalanceAllReportsQuery,
} = TrialBalanceReportApi;

export const selectFilteredTrialBalanceReports = (trialBalanceReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return trialBalanceReports;
    }

    return FuseUtils.filterArrayByString(trialBalanceReports, searchText);
  });
