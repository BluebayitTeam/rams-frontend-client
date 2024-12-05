import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
  CREATE_PASSENGER_LEDGER_DELIVERY,
  GET_PASSENGER_DELIVERY_REPORT,
  GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
  GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
  GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
  GET_PASSENGER_LEDGER_REPORT,
  POSTDATE_FILTER_BY,
  POSTDATE_FILTER_WITHOUT_PG,
  UPDATE_PASSENGER_LEDGER_DELIVERY,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import PassengerDeliveryModel from './passengerDelivery/models/PassengerDeliveryModel';

export const addTagTypes = ['passengerDeliverys'];
const PassengerDeliveryApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPassengerDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerDeliverys'],
      }),
      getPassengerPurchasesDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerPurchasesDeliverys'],
      }),
      getPassengerPurchasesDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerPurchasesDeliverys'],
      }),
      getPassengerPurchasesDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_COST_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerPurchasesDeliverys'],
      }),
      getPassengerSalesDeliverys: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_LEDGER_BILL_DETAILS_REPORT,
          params: filterData,
        }),
        providesTags: ['passengerSalesDeliverys'],
      }),
      getPassengerDeliveryAllReports: build.query({
        query: (filterData) => ({
          url: GET_PASSENGER_DELIVERY_REPORT_WITHOUT_PG,
          params: filterData,
        }),
        providesTags: ['passengerDeliverys'],
      }),
      createPassengerDelivery: build.mutation({
        query: (newPassengerDelivery) => ({
          url: CREATE_PASSENGER_LEDGER_DELIVERY,
          method: 'POST',
          data: jsonToFormData(PassengerDeliveryModel(newPassengerDelivery)),
        }),
        invalidatesTags: ['passengerDeliverys'],
      }),
      updatePassengerDelivery: build.mutation({
        query: (passengerDelivery) => ({
          url: `${UPDATE_PASSENGER_LEDGER_DELIVERY}${passengerDelivery.id}`,
          method: 'PUT',
          data: jsonToFormData(...passengerDelivery),
        }),
        invalidatesTags: ['visaSubmissionLists'],
      }),
    }),
    overrideExisting: false,
  });
export default PassengerDeliveryApi;
export const {
  useGetPassengerDeliverysQuery,
  useGetPassengerPurchasesDeliverysQuery,
  useGetPassengerSalesDeliverysQuery,
  useGetPassengerDeliveryAllReportsQuery,
  useCreatePassengerDeliveryMutation,
  useUpdatePassengerDeliveryMutation,
} = PassengerDeliveryApi;

export const selectFilteredPassengerDeliverys = (passengerDeliverys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return passengerDeliverys;
    }

    return FuseUtils.filterArrayByString(passengerDeliverys, searchText);
  });
