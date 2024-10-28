import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  ALL_USERS,
  GET_DEMANDS,
  GET_DEMAND_BY_ID,
  CREATE_DEMAND,
  DELETE_DEMAND,
  UPDATE_DEMAND,
  GET_TICKETSALES,
  CREATE_TICKETSALE_WITH_IMAGE,
  CREATE_TICKETSALE,
  CREATE_SINGLE_TICKETSALE_WITH_IMAGE,
  GET_TICKETSALE_BY_ID,
  UPDATE_TICKETSALE,
  DELETE_TICKETSALE,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TicketSaleModel from './ticketSale/models/TicketSaleModel';

export const addTagTypes = ['ticketSales'];
const TicketSaleApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketSales: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_TICKETSALES,
          params: { page, size, searchKey },
        }),
        providesTags: ['ticketSales'],
      }),
      getMultiplePassengers: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_DEMANDS,
          params: { page, size, searchKey },
        }),
        providesTags: ['ticketSales'],
      }),
      deleteTicketSales: build.mutation({
        query: (ticketSaleIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: ticketSaleIds,
        }),
        invalidatesTags: ['ticketSales'],
      }),
      getTicketSale: build.query({
        query: (ticketSaleId) => ({
          url: `${GET_TICKETSALE_BY_ID}${ticketSaleId}`,
        }),
        providesTags: ['ticketSales'],
      }),
      createTicketSale: build.mutation({
        query: (newTicketSale) => ({
          url: CREATE_TICKETSALE_WITH_IMAGE,
          method: 'POST',
          data: {},
        }),
        invalidatesTags: ['ticketSales'],
      }),
      createTicketSingleSale: build.mutation({
        query: (newTicketSale) => ({
          url: CREATE_SINGLE_TICKETSALE_WITH_IMAGE,
          method: 'POST',
          data: jsonToFormData(TicketSaleModel(newTicketSale)),
        }),
        invalidatesTags: ['ticketSales'],
      }),
      updateTicketSale: build.mutation({
        query: (ticketSale) => ({
          url: `${UPDATE_TICKETSALE}${ticketSale.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketSale),
        }),
        invalidatesTags: ['ticketSales'],
      }),
      deleteTicketSale: build.mutation({
        query: (ticketSaleId) => ({
          url: `${DELETE_TICKETSALE}${ticketSaleId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketSales'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketSaleApi;
export const {
  useGetTicketSalesQuery,
  useDeleteTicketSalesMutation,
  useGetTicketSaleQuery,
  useUpdateTicketSaleMutation,
  useDeleteTicketSaleMutation,
  useCreateTicketSaleMutation,
  useCreateTicketSingleSaleMutation,
} = TicketSaleApi;

export const selectFilteredTicketSales = (ticketSales) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return ticketSales;
    }

    return FuseUtils.filterArrayByString(ticketSales, searchText);
  });
