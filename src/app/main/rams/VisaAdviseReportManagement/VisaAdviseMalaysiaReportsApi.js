import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import { selectSearchText } from './store/searchTextSlice';
import { GET_DASHBOARD_FOR_VISA_ADVICE_MALAYSIA } from 'src/app/constant/constants';

export const addTagTypes = ['visaadviseMalaysiaReports'];
const VisaAdviseMalaysiaReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaAdviseMalaysiaReports: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_FOR_VISA_ADVICE_MALAYSIA,
          params: filterData,
        }),
        providesTags: ['visaadviseMalaysiaReports'],
      }),
    }),
    overrideExisting: false,
  });
export default VisaAdviseMalaysiaReportApi;
export const { useGetVisaAdviseMalaysiaReportsQuery } =
  VisaAdviseMalaysiaReportApi;

export const selectFilteredVisaAdviseMalaysiaReports = (
  visaadviseMalaysiaReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaadviseMalaysiaReports;
    }

    return FuseUtils.filterArrayByString(visaadviseMalaysiaReports, searchText);
  });
