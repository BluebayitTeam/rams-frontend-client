import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
  GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
  GET_FLIGHT_FLIGHT_DONE_LIST,
  GET_FLIGHT_FLIGHT_DONE_LIST_WITHOUT_PG,
  GET_UPCOMING_MEDICAL_COUNT,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalExpireSaudiReports'];
const MedicalExpireSaudiReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalExpireSaudiReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT,
          params: filterData,
        }),
        providesTags: ['medicalExpireSaudiReports'],
      }),
      getMedicalExpireSaudiAllReports: build.query({
        query: (filterData) => ({
          url: GET_EXPIRABLE_MEDICAL_NOTOFICATION_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalExpireSaudiReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalExpireSaudiReportApi;
export const {
  useGetMedicalExpireSaudiReportsQuery,
  useGetMedicalExpireSaudiAllReportsQuery,
} = MedicalExpireSaudiReportApi;

export const selectFilteredMedicalExpireSaudiReports = (
  medicalExpireSaudiReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalExpireSaudiReports;
    }

    return FuseUtils.filterArrayByString(medicalExpireSaudiReports, searchText);
  });
