import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import { UPDATE_MULTIPLE_STATUS } from "src/app/constant/constants";
import { selectSearchText } from "./store/searchTextSlice";
import MultipleStatusUpdateModel from "./multipleStatusUpdate/models/MultipleStatusUpdateModel";

export const addTagTypes = ["multipleStatusUpdates"];
const MultipleStatusUpdateApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createMultipleStatusUpdate: build.mutation({
        query: (newMultipleStatusUpdate) => {
          console.log("testApi", newMultipleStatusUpdate);
          return {
            url: UPDATE_MULTIPLE_STATUS,
            method: "PUT",
            data: MultipleStatusUpdateModel({
              current_status: newMultipleStatusUpdate?.current_status,
              date: newMultipleStatusUpdate?.date,
              selected_value: newMultipleStatusUpdate?.selected_value,
              passengers: newMultipleStatusUpdate?.passengers,
              status: newMultipleStatusUpdate?.status,
            }),
          };
        },
        invalidatesTags: ["multipleStatusUpdates"],
      }),
    }),
    overrideExisting: false,
  });
export default MultipleStatusUpdateApi;
export const { useCreateMultipleStatusUpdateMutation } =
  MultipleStatusUpdateApi;

export const selectFilteredMultipleStatusUpdates = (multipleStatusUpdates) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return multipleStatusUpdates;
    }

    return FuseUtils.filterArrayByString(multipleStatusUpdates, searchText);
  });
