import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  DELETE_DEPARTMENT_MULTIPLE,
  GET_DEPARTMENT_BY_ID,
  MEDICAL_FILTER_BY,
  MEDICAL_FILTER_WITHOUT_PG,
  PASSENGER_FILTER_BY,
  PASSENGER_FILTER_WITHOUT_PG,
  UPDATE_DEPARTMENT,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['medicalReports'];
const MedicalReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMedicalReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_BY,
          params: filterData,
        }),
        providesTags: ['medicalReports'],
      }),
      getMedicalAllReports: build.query({
        query: (filterData) => ({
          url: MEDICAL_FILTER_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['medicalReports'],
      }),
      deleteMedicalReports: build.mutation({
        query: (medicalReportIds) => ({
          url: DELETE_DEPARTMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: medicalReportIds },
        }),
        invalidatesTags: ['medicalReports'],
      }),
      getMedicalReport: build.query({
        query: (medicalReportId) => ({
          url: `${GET_DEPARTMENT_BY_ID}${medicalReportId}`,
        }),
        providesTags: ['medicalReports'],
      }),
      createMedicalReport: build.mutation({
        query: (newMedicalReport) => ({
          url: CREATE_DEPARTMENT,
          method: 'POST',
          data: jsonToFormData(newMedicalReport),
        }),
        invalidatesTags: ['medicalReports'],
      }),
      updateMedicalReport: build.mutation({
        query: (medicalReport) => ({
          url: `${UPDATE_DEPARTMENT}${medicalReport.id}`,
          method: 'PUT',
          data: jsonToFormData(medicalReport),
        }),
        invalidatesTags: ['medicalReports'],
      }),
      deleteMedicalReport: build.mutation({
        query: (medicalReportId) => ({
          url: `${DELETE_DEPARTMENT}${medicalReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['medicalReports'],
      }),
    }),
    overrideExisting: false,
  });
export default MedicalReportApi;
export const {
  useGetMedicalReportsQuery,
  useGetMedicalAllReportsQuery,
  useDeleteMedicalReportsMutation,
  useGetMedicalReportQuery,
  useUpdateMedicalReportMutation,
  useDeleteMedicalReportMutation,
  useCreateMedicalReportMutation,
} = MedicalReportApi;

export const selectFilteredMedicalReports = (medicalReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return medicalReports;
    }

    return FuseUtils.filterArrayByString(medicalReports, searchText);
  });
