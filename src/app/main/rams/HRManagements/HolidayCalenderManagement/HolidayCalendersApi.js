import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';

import HolidayCalenderModel from './holidayCalender/models/HolidayCalenderModel';
import { selectSearchText } from './store/searchTextSlice';
import {
  CREATE_CALENDER,
  DELETE_CALENDER,
  GET_CALENDERID,
  GET_CALENDERS,
  UPDATE_CALENDER,
} from 'src/app/constant/constants';

export const addTagTypes = ['holidayCalenders'];
const HolidayCalenderApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getHolidayCalenders: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_CALENDERS,
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
          url: `${GET_CALENDERID}${holidayCalenderId}`,
        }),
        providesTags: ['holidayCalenders'],
      }),
      createHolidayCalender: build.mutation({
        query: (newHolidayCalender) => ({
          url: CREATE_CALENDER,
          method: 'POST',
          data: jsonToFormData(HolidayCalenderModel(newHolidayCalender)),
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
      updateHolidayCalender: build.mutation({
        query: (holidayCalender) => ({
          url: `${UPDATE_CALENDER}${holidayCalender.id}`,
          method: 'PUT',
          data: jsonToFormData(holidayCalender),
        }),
        invalidatesTags: ['holidayCalenders'],
      }),
      deleteHolidayCalender: build.mutation({
        query: (holidayCalenderId) => ({
          url: `${DELETE_CALENDER}${holidayCalenderId}`,
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
