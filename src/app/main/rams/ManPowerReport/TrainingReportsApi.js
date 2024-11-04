import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  TRAINING_FILTER_BY,
  TRAINING_FILTER_WITHOUT_PG,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['trainingReports'];
const TrainingReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTrainingReports: build.query({
        query: (filterData) => ({
          url: TRAINING_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['trainingReports'],
      }),
      getTrainingAllReports: build.query({
        query: (filterData) => ({
          url: TRAINING_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['trainingReports'],
      }),
    }),
    overrideExisting: false,
  });
export default TrainingReportApi;
export const { useGetTrainingReportsQuery, useGetTrainingAllReportsQuery } =
  TrainingReportApi;

export const selectFilteredTrainingReports = (trainingReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return trainingReports;
    }

    return FuseUtils.filterArrayByString(trainingReports, searchText);
  });
