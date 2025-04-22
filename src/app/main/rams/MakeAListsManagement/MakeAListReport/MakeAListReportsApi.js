import FuseUtils from "@fuse/utils";
import { createSelector } from "@reduxjs/toolkit";
import { apiService as api } from "app/store/apiService";
import jsonToFormData from "src/app/@helpers/jsonToFormData";

import { selectSearchText } from "./store/searchTextSlice";
import {
  GET_MAKEALIST_REPORT_BY_ID,
  GET_MAKEALIST_REPORT_BY_ID_NO_PG,
} from "src/app/constant/constants";

export const addTagTypes = ["makeAListReports"];
const MakeAListReportApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // getMakeAListReports: build.query({
      //   // query: (filterData) => ({
      //   //   url: GET_MAKEALIST_REPORT_BY_ID,
      //   //   params: filterData,
      //   // }),

      //   query: (makeAListId) => ({
      //     url: `${GET_MAKEALIST_REPORT_BY_ID}${makeAListId}`,
      //   }),
      //   providesTags: ["makeAListReports"],
      // }),

      getMakeAListReports: build.query({
        query: (makeAListId) => ({
          url: `${GET_MAKEALIST_REPORT_BY_ID}${makeAListId}`,
        }),
        providesTags: ["makeAListReports"],
      }),
      getMakeAListAllReports: build.query({
        query: (makeAListId) => ({
          url: `${GET_MAKEALIST_REPORT_BY_ID_NO_PG}${makeAListId}`,
        }),
        providesTags: ["makeAListReports"],
      }),
    }),
    overrideExisting: false,
  });
export default MakeAListReportApi;
export const { useGetMakeAListReportsQuery, useGetMakeAListAllReportsQuery } =
  MakeAListReportApi;

export const selectFilteredMakeAListReports = (makeAListReports) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return makeAListReports;
    }

    return FuseUtils.filterArrayByString(makeAListReports, searchText);
  });
