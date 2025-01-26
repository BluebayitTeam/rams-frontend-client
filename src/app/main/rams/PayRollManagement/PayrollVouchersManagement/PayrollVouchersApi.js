import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import PayrollVoucherModel from './payrollVoucher/models/PayrollVoucherModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_PAYROLL_VOUCHER,
  DELETE_PAYROLL_VOUCHER,
  GET_PAYROLL_VOUCHERID,
  GET_PAYROLL_VOUCHERS,
  UPDATE_PAYROLL_VOUCHER,
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
          url: GET_PAYROLL_VOUCHERS,
          params: { page, size, searchKey },
        }),
        providesTags: ['payrollVouchers'],
      }),
      deletePayrollVouchers: build.mutation({
        query: (payrollVoucherIds) => ({
          url: DELETE_PAYROLL_VOUCHER,
          method: 'DELETE',
          data: { ids: payrollVoucherIds },
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      getPayrollVoucher: build.query({
        query: (payrollVoucherId) => ({
          url: `${GET_PAYROLL_VOUCHERID}${payrollVoucherId}`,
        }),
        providesTags: ['payrollVouchers'],
      }),
      createPayrollVoucher: build.mutation({
        query: (newPayrollVoucher) => ({
          url: CREATE_PAYROLL_VOUCHER,
          method: 'POST',
          data: PayrollVoucherModel(newPayrollVoucher),
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      updatePayrollVoucher: build.mutation({
        query: (payrollVoucher) => ({
          url: `${UPDATE_PAYROLL_VOUCHER}${payrollVoucher.id}`,
          method: 'PUT',
          data: payrollVoucher,
        }),
        invalidatesTags: ['payrollVouchers'],
      }),
      deletePayrollVoucher: build.mutation({
        query: (payrollVoucherId) => ({
          url: `${DELETE_PAYROLL_VOUCHER}${payrollVoucherId}`,
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
