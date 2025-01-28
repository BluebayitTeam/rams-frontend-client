import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import SalaryPaymentModel from './salaryPayment/models/SalaryPaymentModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_PAYMENTSALARY,
  DELETE_PAYMENTSALARY,
  DELETE_PAYMENTSALARY_MULTIPLE,
  GET_PAYMENTSALARY_BY_ID,
  GET_PAYMENTSALARYS,
  UPDATE_PAYMENTSALARY,
} from 'src/app/constant/constants';

export const addTagTypes = ['salaryPayments'];
const SalaryPaymentApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSalaryPayments: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PAYMENTSALARYS,
          params: { page, size, searchKey },
        }),
        providesTags: ['salaryPayments'],
      }),
      deleteSalaryPayments: build.mutation({
        query: (salaryPaymentIds) => ({
          url: DELETE_PAYMENTSALARY_MULTIPLE,
          method: 'DELETE',
          data: { ids: salaryPaymentIds },
        }),
        invalidatesTags: ['salaryPayments'],
      }),
      getSalaryPayment: build.query({
        query: (salaryPaymentId) => ({
          url: `${GET_PAYMENTSALARY_BY_ID}${salaryPaymentId}`,
        }),
        providesTags: ['salaryPayments'],
      }),
      createSalaryPayment: build.mutation({
        query: (newSalaryPayment) => ({
          url: CREATE_PAYMENTSALARY,
          method: 'POST',
          data: SalaryPaymentModel(newSalaryPayment),
        }),
        invalidatesTags: ['salaryPayments'],
      }),
      updateSalaryPayment: build.mutation({
        query: (salaryPayment) => ({
          url: `${UPDATE_PAYMENTSALARY}${salaryPayment.id}`,
          method: 'PUT',
          data: salaryPayment,
        }),
        invalidatesTags: ['salaryPayments'],
      }),
      deleteSalaryPayment: build.mutation({
        query: (salaryPaymentId) => ({
          url: `${DELETE_PAYMENTSALARY}${salaryPaymentId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['salaryPayments'],
      }),
    }),
    overrideExisting: false,
  });
export default SalaryPaymentApi;
export const {
  useGetSalaryPaymentsQuery,
  useDeleteSalaryPaymentsMutation,
  useGetSalaryPaymentQuery,
  useUpdateSalaryPaymentMutation,
  useDeleteSalaryPaymentMutation,

  useCreateSalaryPaymentMutation,
} = SalaryPaymentApi;

export const selectFilteredSalaryPayments = (salaryPayments) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return salaryPayments;
    }

    return FuseUtils.filterArrayByString(salaryPayments, searchText);
  });
