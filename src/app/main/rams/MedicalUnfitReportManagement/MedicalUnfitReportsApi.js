import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_MEDICAL_UNFIT_LIST,
  GET_MEDICAL_UNFIT_LIST_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalUnfitReports'];
const MedicalUnfitReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalUnfitReports: build.query({
        query: (filterData) => ({
          url: GET_MEDICAL_UNFIT_LIST,
          params: filterData,
        }),
        providesTags: ['medicalUnfitReports'],
      }),
      getMedicalUnfitAllReports: build.query({
        query: (filterData) => ({
          url: GET_MEDICAL_UNFIT_LIST_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalUnfitReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalUnfitReportApi;
export const {
  useGetMedicalUnfitReportsQuery,
  useGetMedicalUnfitAllReportsQuery,
} = MedicalUnfitReportApi;

export const selectFilteredMedicalUnfitReports = (medicalUnfitReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalUnfitReports;
    }

    return FuseUtils.filterArrayByString(medicalUnfitReports, searchText);
  });
