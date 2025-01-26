import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import PayrollVoucherModel from './payrollVoucher/models/PayrollVoucherModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_PAY_HEAD_ASSIGNMENT,
  CREATE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_ASSIGNMENT,
  DELETE_PAY_HEAD_ASSIGNMENT_MULTIPLE,
  DELETE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE_MULTIPLE,
  GET_PAY_HEAD_ASSIGNMENT,
  GET_PAY_HEAD_ASSIGNMENT_BY_ID,
  GET_PAY_HEAD_TYPE_BY_ID,
  GET_PAY_HEAD_TYPES,
  UPDATE_PAY_HEAD_ASSIGNMENT,
  UPDATE_PAY_HEAD_TYPE,
} from 'src/app/constant/constants';

export const addTagTypes = ['payrollVouchers'];
const PayrollVoucherApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getPayrollVouchers: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PAY_HEAD_ASSIGNMENT,
          params: { page, size, searchKey },
        }),
        providesTags: ['payrollVouchers'],
      }),
      deletePayrollVouchers: build.mutation({
        query: (payrollVoucherIds) => ({
          url: DELETE_PAY_HEAD_ASSIGNMENT_MULTIPLE,
          method: 'DELETE',
          data: { ids: payrollVoucherIds },
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      getPayrollVoucher: build.query({
        query: (payrollVoucherId) => ({
          url: `${GET_PAY_HEAD_ASSIGNMENT_BY_ID}${payrollVoucherId}`,
        }),
        providesTags: ['payrollVouchers'],
      }),
      createPayrollVoucher: build.mutation({
        query: (newPayrollVoucher) => ({
          url: CREATE_PAY_HEAD_ASSIGNMENT,
          method: 'POST',
          data: PayrollVoucherModel(newPayrollVoucher),
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      updatePayrollVoucher: build.mutation({
        query: (payrollVoucher) => ({
          url: `${UPDATE_PAY_HEAD_ASSIGNMENT}${payrollVoucher.id}`,
          method: 'PUT',
          data: payrollVoucher,
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      deletePayrollVoucher: build.mutation({
        query: (payrollVoucherId) => ({
          url: `${DELETE_PAY_HEAD_ASSIGNMENT}${payrollVoucherId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
    }),
    overrideExisting: false,
  });
export default PayrollVoucherApi;
export const {
  useGetPayrollVouchersQuery,
  useDeletePayrollVouchersMutation,
  useGetPayrollVoucherQuery,
  useUpdatePayrollVoucherMutation,
  useDeletePayrollVoucherMutation,

  useCreatePayrollVoucherMutation,
} = PayrollVoucherApi;

export const selectFilteredPayrollVouchers = (payrollVouchers) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return payrollVouchers;
    }

    return FuseUtils.filterArrayByString(payrollVouchers, searchText);
  });
