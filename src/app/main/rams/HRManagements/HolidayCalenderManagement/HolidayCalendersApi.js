import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  CREATE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE,
  DELETE_PAY_HEAD_TYPE_MULTIPLE,
  GET_PAY_HEAD_TYPES,
  GET_PAY_HEAD_TYPE_BY_ID,
  UPDATE_PAY_HEAD_TYPE,
} from 'src/app/constant/constants';
import HolidayCalenderModel from './holidayCalender/models/HolidayCalenderModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['holidayCalenders'];
const HolidayCalenderApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getHolidayCalenders: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_PAY_HEAD_TYPES,
          params: { page, size, searchKey },
        }),
        providesTags: ['holidayCalenders'],
      }),
      deleteHolidayCalenders: build.mutation({
        query: (holidayCalenderIds) => ({
          url: DELETE_PAY_HEAD_TYPE_MULTIPLE,
          method: 'DELETE',
          data: { ids: holidayCalenderIds },
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
      getHolidayCalender: build.query({
        query: (holidayCalenderId) => ({
          url: `${GET_PAY_HEAD_TYPE_BY_ID}${holidayCalenderId}`,
        }),
        providesTags: ['holidayCalenders'],
      }),
      createHolidayCalender: build.mutation({
        query: (newHolidayCalender) => ({
          url: CREATE_PAY_HEAD_TYPE,
          method: 'POST',
          data: jsonToFormData(HolidayCalenderModel(newHolidayCalender)),
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
      updateHolidayCalender: build.mutation({
        query: (holidayCalender) => ({
          url: `${UPDATE_PAY_HEAD_TYPE}${holidayCalender.id}`,
          method: 'PUT',
          data: jsonToFormData(holidayCalender),
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
      deleteHolidayCalender: build.mutation({
        query: (holidayCalenderId) => ({
          url: `${DELETE_PAY_HEAD_TYPE}${holidayCalenderId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
    }),
    overrideExisting: false,
  });
export default HolidayCalenderApi;
export const {
  useGetHolidayCalendersQuery,
  useDeleteHolidayCalendersMutation,
  useGetHolidayCalenderQuery,
  useUpdateHolidayCalenderMutation,
  useDeleteHolidayCalenderMutation,

  useCreateHolidayCalenderMutation,
} = HolidayCalenderApi;

export const selectFilteredHolidayCalenders = (holidayCalenders) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return holidayCalenders;
    }

    return FuseUtils.filterArrayByString(holidayCalenders, searchText);
  });
