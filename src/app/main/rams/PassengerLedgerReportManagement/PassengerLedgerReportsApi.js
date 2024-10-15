import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
	GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
	GET_PASSENGER_LEDGER_REPORT,
	GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG
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
			getPassengerLedgerBillDetailDataReports: build.query({
				query: (filterData) => ({
					url: GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
					params: filterData
				}),
				providesTags: ['passengerLedgerReports']
			}),
			getPassengerLedgerCostDetailDataReports: build.query({
				query: (filterData) => ({
					url: GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
					params: filterData
				}),
				providesTags: ['passengerLedgerReports']
			}),
		
		}),
		overrideExisting: false
	});
export default PassengerLedgerReportApi;
export const {
	useGetPassengerLedgerReportsQuery,
	useGetPassengerLedgerAllReportsQuery,
	useGetPassengerLedgerBillDetailDataReportsQuery,
	useGetPassengerLedgerCostDetailDataReportsQuery,
	
} = PassengerLedgerReportApi;

export const selectFilteredPassengerLedgerReports = (passengerLedgerReports) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerLedgerReports;
		}

		return FuseUtils.filterArrayByString(passengerLedgerReports, searchText);
	});
