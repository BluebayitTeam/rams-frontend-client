import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_MEDICAL_VISIT_LIST,
  GET_MEDICAL_VISIT_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalVisitReports'];
const MedicalVisitReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalVisitReports: build.query({
        query: (filterData) => ({
          url: GET_MEDICAL_VISIT_LIST,
          params: filterData,
        }),
        providesTags: ['medicalVisitReports'],
      }),
      getMedicalVisitAllReports: build.query({
        query: (filterData) => ({
          url: GET_MEDICAL_VISIT_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalVisitReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalVisitReportApi;
export const {
  useGetMedicalVisitReportsQuery,
  useGetMedicalVisitAllReportsQuery,
} = MedicalVisitReportApi;

export const selectFilteredMedicalVisitReports = (medicalVisitReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalVisitReports;
    }

    return FuseUtils.filterArrayByString(medicalVisitReports, searchText);
  });
