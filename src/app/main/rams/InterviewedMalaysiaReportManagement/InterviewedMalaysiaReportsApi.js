import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['interviewedMalaysiaReports'];
const InterviewedMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getInterviewedMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['interviewedMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default InterviewedMalaysiaReportApi;
export const { useGetInterviewedMalaysiaReportsQuery } =
  InterviewedMalaysiaReportApi;

export const selectFilteredInterviewedMalaysiaReports = (
  interviewedMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return interviewedMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(
      interviewedMalaysiaReports,
      searchText
    );
  });
