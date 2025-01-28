import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ProvidentFundModel from './providentFund/models/ProvidentFundModel';
import {
  CREATE_PROVIDENT_FUND,
  DELETE_PROVIDENT_FUND,
  DELETE_PROVIDENT_FUND_MULTIPLE,
  GET_PROVIDENT_FUND_BY_ID,
  GET_PROVIDENT_FUNDS,
  UPDATE_PROVIDENT_FUND,
} from 'src/app/constant/constants';

export const addTagTypes = ['providentFunds'];
const ProvidentFundApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProvidentFunds: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PROVIDENT_FUNDS,
          params: { page, size, searchKey },
        }),
        providesTags: ['providentFunds'],
      }),
      deleteProvidentFunds: build.mutation({
        query: (providentFundIds) => ({
          url: DELETE_PROVIDENT_FUND_MULTIPLE,
          method: 'DELETE',
          data: { ids: providentFundIds },
        }),
        invalidatesTags: ['providentFunds'],
      }),
      getProvidentFund: build.query({
        query: (providentFundId) => ({
          url: `${GET_PROVIDENT_FUND_BY_ID}${providentFundId}`,
        }),
        providesTags: ['providentFunds'],
      }),
      createProvidentFund: build.mutation({
        query: (newProvidentFund) => ({
          url: CREATE_PROVIDENT_FUND,
          method: 'POST',
          data: jsonToFormData(ProvidentFundModel(newProvidentFund)),
        }),
        invalidatesTags: ['providentFunds'],
      }),
      updateProvidentFund: build.mutation({
        query: (providentFund) => ({
          url: `${UPDATE_PROVIDENT_FUND}`,
          method: 'PUT',
          data: jsonToFormData(providentFund),
        }),
        invalidatesTags: ['providentFunds'],
      }),
      deleteProvidentFund: build.mutation({
        query: (providentFundId) => ({
          url: `${DELETE_PROVIDENT_FUND}${providentFundId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['providentFunds'],
      }),
    }),
    overrideExisting: false,
  });
export default ProvidentFundApi;
export const {
  useGetProvidentFundsQuery,
  useDeleteProvidentFundsMutation,
  useGetProvidentFundQuery,
  useUpdateProvidentFundMutation,
  useDeleteProvidentFundMutation,

  useCreateProvidentFundMutation,
} = ProvidentFundApi;

export const selectFilteredProvidentFunds = (providentFunds) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return providentFunds;
    }

    return FuseUtils.filterArrayByString(providentFunds, searchText);
  });
