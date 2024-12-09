import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  CREATE_PASSENGER_LEDGER_DELIVERY,
  DELETE_PASSENGER_LEDGER_DELIVERY,
  GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
  GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
  GET_PASSENGER_LEDGER_REPORT,
  GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG,
  UPDATE_PASSENGER_LEDGER_DELIVERY,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

export const addTagTypes = ['passengerLedgerReports'];
const PassengerLedgerReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerLedgerReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerLedgerReports'],
      }),
      getPassengerLedgerAllReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerLedgerReports'],
      }),
      getPassengerLedgerBillDetailDataReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerLedgerReports'],
      }),
      getPassengerLedgerCostDetailDataReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerLedgerReports'],
      }),
      createPassengerLedgerReport: build.mutation({
        query: (newPassengerLedgerReport) => ({
          url: CREATE_PASSENGER_LEDGER_DELIVERY,
          method: 'POST',
          data: jsonToFormData(newPassengerLedgerReport),
        }),
        invalidatesTags: ['passengerLedgerReports'],
      }),

      updatePassengerLedgerReport: build.mutation({
        query: (passengerDelivery) => ({
          url: `${UPDATE_PASSENGER_LEDGER_DELIVERY}${passengerDelivery?.id}`,
          method: 'PUT',
          data: jsonToFormData({
            ...passengerDelivery,
          }),
        }),
        invalidatesTags: ['passengerLedgerReports'],
      }),
      deletePassengerLedgerReport: build.mutation({
        query: (passengerLedgerReportId) => ({
          url: `${DELETE_PASSENGER_LEDGER_DELIVERY}${passengerLedgerReportId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['passengerLedgerReports'],
      }),
    }),

    overrideExisting: false,
  });
export default PassengerLedgerReportApi;
export const {
  useGetPassengerLedgerReportsQuery,
  useGetPassengerLedgerAllReportsQuery,
  useGetPassengerLedgerBillDetailDataReportsQuery,
  useGetPassengerLedgerCostDetailDataReportsQuery,
  useUpdatePassengerLedgerReportMutation,
  useDeletePassengerLedgerReportMutation,
  useCreatePassengerLedgerReportMutation,
} = PassengerLedgerReportApi;

export const selectFilteredPassengerLedgerReports = (passengerLedgerReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerLedgerReports;
    }

    return FuseUtils.filterArrayByString(passengerLedgerReports, searchText);
  });
