import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  MEDICAL_FIT_LIST,
  MEDICAL_FIT_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalFitReports'];
const MedicalFitReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalFitReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FIT_LIST,
          params: filterData,
        }),
        providesTags: ['medicalFitReports'],
      }),
      getMedicalFitAllReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FIT_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalFitReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalFitReportApi;
export const { useGetMedicalFitReportsQuery, useGetMedicalFitAllReportsQuery } =
  MedicalFitReportApi;

export const selectFilteredMedicalFitReports = (medicalFitReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalFitReports;
    }

    return FuseUtils.filterArrayByString(medicalFitReports, searchText);
  });
