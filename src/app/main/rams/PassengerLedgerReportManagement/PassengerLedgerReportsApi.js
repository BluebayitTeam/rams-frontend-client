import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENT_BY_ID,
	GET_PASSENGER_LEDGER_REPORT,
	GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerLedgerReports'];
const PassengerLedgerReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerLedgerReports: build.query({
				query: (filterData) => ({
					url: GET_PASSENGER_LEDGER_REPORT,
					params: filterData
				}),
				providesTags: ['passengerLedgerReports']
			}),
			getPassengerLedgerAllReports: build.query({
				query: (filterData) => ({
					url: GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG,
					params: filterData
				}),
				providesTags: ['passengerLedgerReports']
			}),
			deletePassengerLedgerReports: build.mutation({
				query: (passengerLedgerReportIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: passengerLedgerReportIds }
				}),
				invalidatesTags: ['passengerLedgerReports']
			}),
			getPassengerLedgerReport: build.query({
				query: (passengerLedgerReportId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${passengerLedgerReportId}`
				}),
				providesTags: ['passengerLedgerReports']
			}),
			createPassengerLedgerReport: build.mutation({
				query: (newPassengerLedgerReport) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(newPassengerLedgerReport)
				}),
				invalidatesTags: ['passengerLedgerReports']
			}),
			updatePassengerLedgerReport: build.mutation({
				query: (passengerLedgerReport) => ({
					url: `${UPDATE_DEPARTMENT}${passengerLedgerReport.id}`,
					method: 'PUT',
					data: jsonToFormData(passengerLedgerReport)
				}),
				invalidatesTags: ['passengerLedgerReports']
			}),
			deletePassengerLedgerReport: build.mutation({
				query: (passengerLedgerReportId) => ({
					url: `${DELETE_DEPARTMENT}${passengerLedgerReportId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['passengerLedgerReports']
			})
		}),
		overrideExisting: false
	});
export default PassengerLedgerReportApi;
export const {
	useGetPassengerLedgerReportsQuery,
	useGetPassengerLedgerAllReportsQuery,
	useDeletePassengerLedgerReportsMutation,
	useGetPassengerLedgerReportQuery,
	useUpdatePassengerLedgerReportMutation,
	useDeletePassengerLedgerReportMutation,
	useCreatePassengerLedgerReportMutation
} = PassengerLedgerReportApi;

export const selectFilteredPassengerLedgerReports = (passengerLedgerReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerLedgerReports;
		}

		return FuseUtils.filterArrayByString(passengerLedgerReports, searchText);
	});
