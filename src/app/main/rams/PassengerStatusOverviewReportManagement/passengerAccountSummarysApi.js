import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	GET_PASSENGER_ACCOUNT_SUMMARY_REPORT,
	GET_PASSENGER_ACCOUNT_SUMMARY_REPORT_WITHOUT_PG
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerAccountSummaryReports'];
const PassengerAccountSummaryReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerAccountSummaryReports: build.query({
				query: (filterData) => ({
					url: `${GET_PASSENGER_ACCOUNT_SUMMARY_REPORT}${filterData?.agent}`,
					
					params: {page:filterData?.page,size:filterData?.size}
				}),
				providesTags: ['passengerAccountSummaryReports']
				
			}),
			getPassengerAccountSummaryAllReports: build.query({
				query: (filterData) => ({
					url: `${GET_PASSENGER_ACCOUNT_SUMMARY_REPORT_WITHOUT_PG}${filterData?.agent}`,
					// params: {agent:filterData.agent}
				}),
				providesTags: ['passengerAccountSummaryReports']
			}),
			// deletePassengerAccountSummaryReports: build.mutation({
			// 	query: (passengerAccountSummaryReportIds) => ({
			// 		url: DELETE_DEPARTMENT_MULTIPLE,
			// 		method: 'DELETE',
			// 		data: { ids: passengerAccountSummaryReportIds }
			// 	}),
			// 	invalidatesTags: ['passengerAccountSummaryReports']
			// }),
			// getPassengerAccountSummaryReport: build.query({
			// 	query: (passengerAccountSummaryReportId) => ({
			// 		url: `${GET_DEPARTMENT_BY_ID}${passengerAccountSummaryReportId}`
			// 	}),
			// 	providesTags: ['passengerAccountSummaryReports']
			// }),
			// createPassengerAccountSummaryReport: build.mutation({
			// 	query: (newPassengerAccountSummaryReport) => ({
			// 		url: CREATE_DEPARTMENT,
			// 		method: 'POST',
			// 		data: jsonToFormData(newPassengerAccountSummaryReport)
			// 	}),
			// 	invalidatesTags: ['passengerAccountSummaryReports']
			// }),
			// updatePassengerAccountSummaryReport: build.mutation({
			// 	query: (passengerAccountSummaryReport) => ({
			// 		url: `${UPDATE_DEPARTMENT}${passengerAccountSummaryReport.id}`,
			// 		method: 'PUT',
			// 		data: jsonToFormData(passengerAccountSummaryReport)
			// 	}),
			// 	invalidatesTags: ['passengerAccountSummaryReports']
			// }),
			// deletePassengerAccountSummaryReport: build.mutation({
			// 	query: (passengerAccountSummaryReportId) => ({
			// 		url: `${DELETE_DEPARTMENT}${passengerAccountSummaryReportId}`,
			// 		method: 'DELETE'
			// 	}),
			// 	invalidatesTags: ['passengerAccountSummaryReports']
			// })
		}),
		overrideExisting: false
	});
export default PassengerAccountSummaryReportApi;
export const {
	useGetPassengerAccountSummaryReportsQuery,
	useGetPassengerAccountSummaryAllReportsQuery,
	// useDeletePassengerAccountSummaryReportsMutation,
	// useGetPassengerAccountSummaryReportQuery,
	// useUpdatePassengerAccountSummaryReportMutation,
	// useDeletePassengerAccountSummaryReportMutation,
	// useCreatePassengerAccountSummaryReportMutation
} = PassengerAccountSummaryReportApi;

export const selectFilteredPassengerAccountSummaryReports = (passengerAccountSummaryReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerAccountSummaryReports;
		}

		return FuseUtils.filterArrayByString(passengerAccountSummaryReports, searchText);
	});
