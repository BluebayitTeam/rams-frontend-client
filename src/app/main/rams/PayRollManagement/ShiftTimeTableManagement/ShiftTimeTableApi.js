import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import {
  GET_SHIFT_TIME_TABLES,
  DELETE_SHIFT_TIME_TABLE_MULTIPLE,
  GET_SHIFT_TIME_TABLE_BY_ID,
  CREATE_SHIFT_TIME_TABLE,
  UPDATE_SHIFT_TIME_TABLE,
  DELETE_SHIFT_TIME_TABLE,
} from "src/app/constant/constants";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import { selectSearchText } from "./store/searchTextSlice";
import ShiftTimeTableModel from "./shiftTimeTable/models/ShiftTimeTableModel";

export const addTagTypes = ["shiftTimeTables"];
const ShiftTimeTableApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getShiftTimeTables: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_SHIFT_TIME_TABLES,
          params: { page, size, searchKey },
        }),
        providesTags: ["shiftTimeTables"],
      }),
      deleteShiftTimeTables: build.mutation({
        query: (shiftTimeTableIds) => ({
          url: DELETE_SHIFT_TIME_TABLE_MULTIPLE,
          method: "DELETE",
          data: { ids: shiftTimeTableIds },
        }),
        invalidatesTags: ["shiftTimeTables"],
      }),
      getShiftTimeTable: build.query({
        query: (shiftTimeTableId) => ({
          url: `${GET_SHIFT_TIME_TABLE_BY_ID}${shiftTimeTableId}`,
        }),
        providesTags: ["shiftTimeTables"],
      }),
      createShiftTimeTable: build.mutation({
        query: (newShiftTimeTable) => ({
          url: CREATE_SHIFT_TIME_TABLE,
          method: "POST",
          data: jsonToFormData(ShiftTimeTableModel(newShiftTimeTable)),
        }),
        invalidatesTags: ["shiftTimeTables"],
      }),
      updateShiftTimeTable: build.mutation({
        query: (shiftTimeTable) => ({
          url: `${UPDATE_SHIFT_TIME_TABLE}${shiftTimeTable.id}`,
          method: "PUT",
          data: jsonToFormData(shiftTimeTable),
        }),
        invalidatesTags: ["shiftTimeTables"],
      }),
      deleteShiftTimeTable: build.mutation({
        query: (shiftTimeTableId) => ({
          url: `${DELETE_SHIFT_TIME_TABLE}${shiftTimeTableId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["shiftTimeTables"],
      }),
    }),
    overrideExisting: false,
  });
export default ShiftTimeTableApi;
export const {
  useGetShiftTimeTablesQuery,
  useDeleteShiftTimeTablesMutation,
  useGetShiftTimeTableQuery,
  useUpdateShiftTimeTableMutation,
  useDeleteShiftTimeTableMutation,
  useCreateShiftTimeTableMutation,
} = ShiftTimeTableApi;

export const selectFilteredShiftTimeTables = (shiftTimeTables) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return shiftTimeTables;
    }

    return FuseUtils.filterArrayByString(shiftTimeTables, searchText);
  });
