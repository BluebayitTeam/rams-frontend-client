import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  GET_PASSENGER_ACCOUNT_SUMMARY_REPORT,
  GET_PASSENGER_ACCOUNT_SUMMARY_REPORT_WITHOUT_PG,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerStatusOverviewReports'];
const PassengerStatusOverviewReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerStatusOverviewReports: build.query({
        query: (filterData) => ({
          url: `${GET_PASSENGER_ACCOUNT_SUMMARY_REPORT}${filterData?.agent}`,

          params: { page: filterData?.page, size: filterData?.size },
        }),
        providesTags: ['passengerStatusOverviewReports'],
      }),
      getPassengerStatusOverviewAllReports: build.query({
        query: (filterData) => ({
          url: `${GET_PASSENGER_ACCOUNT_SUMMARY_REPORT_WITHOUT_PG}${filterData?.agent}`,
          // params: {agent:filterData.agent}
        }),
        providesTags: ['passengerStatusOverviewReports'],
      }),
      // deletePassengerStatusOverviewReports: build.mutation({
      // 	query: (passengerStatusOverviewReportIds) => ({
      // 		url: DELETE_DEPARTMENT_MULTIPLE,
      // 		method: 'DELETE',
      // 		data: { ids: passengerStatusOverviewReportIds }
      // 	}),
      // 	invalidatesTags: ['passengerStatusOverviewReports']
      // }),
      // getPassengerStatusOverviewReport: build.query({
      // 	query: (passengerStatusOverviewReportId) => ({
      // 		url: `${GET_DEPARTMENT_BY_ID}${passengerStatusOverviewReportId}`
      // 	}),
      // 	providesTags: ['passengerStatusOverviewReports']
      // }),
      // createPassengerStatusOverviewReport: build.mutation({
      // 	query: (newPassengerStatusOverviewReport) => ({
      // 		url: CREATE_DEPARTMENT,
      // 		method: 'POST',
      // 		data: jsonToFormData(newPassengerStatusOverviewReport)
      // 	}),
      // 	invalidatesTags: ['passengerStatusOverviewReports']
      // }),
      // updatePassengerStatusOverviewReport: build.mutation({
      // 	query: (passengerStatusOverviewReport) => ({
      // 		url: `${UPDATE_DEPARTMENT}${passengerStatusOverviewReport.id}`,
      // 		method: 'PUT',
      // 		data: jsonToFormData(passengerStatusOverviewReport)
      // 	}),
      // 	invalidatesTags: ['passengerStatusOverviewReports']
      // }),
      // deletePassengerStatusOverviewReport: build.mutation({
      // 	query: (passengerStatusOverviewReportId) => ({
      // 		url: `${DELETE_DEPARTMENT}${passengerStatusOverviewReportId}`,
      // 		method: 'DELETE'
      // 	}),
      // 	invalidatesTags: ['passengerStatusOverviewReports']
      // })
    }),
    overrideExisting: false,
  });
export default PassengerStatusOverviewReportApi;
export const {
  useGetPassengerStatusOverviewReportsQuery,
  useGetPassengerStatusOverviewAllReportsQuery,
  // useDeletePassengerStatusOverviewReportsMutation,
  // useGetPassengerStatusOverviewReportQuery,
  // useUpdatePassengerStatusOverviewReportMutation,
  // useDeletePassengerStatusOverviewReportMutation,
  // useCreatePassengerStatusOverviewReportMutation
} = PassengerStatusOverviewReportApi;

export const selectFilteredPassengerStatusOverviewReports = (
  passengerStatusOverviewReports
) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerStatusOverviewReports;
    }

    return FuseUtils.filterArrayByString(
      passengerStatusOverviewReports,
      searchText
    );
  });
