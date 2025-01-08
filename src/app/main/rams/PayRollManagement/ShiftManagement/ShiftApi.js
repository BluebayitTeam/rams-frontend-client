import FuseUtils from "@fuse/utils";
import { createSelector } from "@reduxjs/toolkit";
import { apiService as api } from "app/store/apiService";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import {
  CREATE_SHIFT,
  DELETE_SHIFT,
  DELETE_SHIFT_MULTIPLE,
  GET_SHIFT_BY_ID,
  GET_SHIFTS,
  GET_TIMETABLE_BY_SHIFT_ID,
  GET_TIMETABLES_WITHOUT_PAGINATION,
  UPDATE_SHIFT,
} from "src/app/constant/constants";
import ShiftModel from "./shift/models/ShiftModel";
import { selectSearchText } from "./store/searchTextSlice";

export const addTagTypes = ["shifts"];
const shiftId = localStorage.getItem('shiftId');

const ShiftApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getShifts: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_SHIFTS,
          params: { page, size, searchKey },
        }),
        providesTags: ["shifts"],
      }),
      getTimetables: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_TIMETABLES_WITHOUT_PAGINATION,
          params: { page, size, searchKey },
        }),
        providesTags: ["shiftsTimetables"]
      }),
      getShiftTimetable: build.query({
        query: ({ page, size, searchKey }) => ({
          url: `${GET_TIMETABLE_BY_SHIFT_ID}${shiftId}`,
          params: { page, size, searchKey },
        }),
        providesTags: ["shiftTimetable"]
      }),
      deleteShifts: build.mutation({
        query: (shiftIds) => ({
          url: DELETE_SHIFT_MULTIPLE,
          method: "DELETE",
          data: { ids: shiftIds },
        }),
        invalidatesTags: ["shifts"],
      }),
      getShift: build.query({
        query: (shiftId) => ({
          url: `${GET_SHIFT_BY_ID}${shiftId}`,
        }),
        providesTags: ["shifts"],
      }),
      createShift: build.mutation({
        query: (newShift) => ({
          url: CREATE_SHIFT,
          method: "POST",
          data: jsonToFormData(ShiftModel(newShift)),
        }),
        invalidatesTags: ["shifts"],
      }),
      updateShift: build.mutation({
        query: (shift) => ({
          url: `${UPDATE_SHIFT}${shift.id}`,
          method: "PUT",
          data: jsonToFormData(shift),
        }),
        invalidatesTags: ["shifts"],
      }),
      deleteShift: build.mutation({
        query: (shiftId) => ({
          url: `${DELETE_SHIFT}${shiftId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["shifts"],
      }),
    }),
    overrideExisting: false,
  });
export default ShiftApi;

export const {
  useGetShiftsQuery,
  useGetTimetablesQuery,
  useGetShiftTimetableQuery,
  useDeleteShiftsMutation,
  useGetShiftQuery,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
  useCreateShiftMutation,
} = ShiftApi;

export const selectFilteredShifts = (shifts) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return shifts;
    }

    return FuseUtils.filterArrayByString(shifts, searchText);
  });
