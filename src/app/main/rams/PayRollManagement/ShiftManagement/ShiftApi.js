import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import {
  CREATE_SHIFT,
  GET_SHIFT_BY_ID,
  UPDATE_SHIFT,
  DELETE_SHIFT,
  GET_SHIFTS,
  DELETE_SHIFT_MULTIPLE,
} from "src/app/constant/constants";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import { selectSearchText } from "./store/searchTextSlice";
import ShiftModel from "./shift/models/ShiftModel";

export const addTagTypes = ["shifts"];

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
