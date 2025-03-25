import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import {
  CREATE_MANPOWERLIST,
  CREATE_VISASUBMISSIONLIST,
  DELETE_MANPOWERLIST,
  DELETE_VISASUBMISSIONLIST,
  MANPOWERLIST_BY_PASSENGER_ID,
  MANPOWERSBLISTS_BY_DATE,
  UPDATE_MANPOWERLIST,
  UPDATE_VISASUBMISSIONLIST,
  VISASBLISTS_BY_DATE,
  VISASUBMISSIONLIST_BY_PASSENGER_ID,
} from "src/app/constant/constants";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import { CustomNotification } from "src/app/@customHooks/notificationAlert";
import { selectSearchText } from "./store/searchTextSlice";
import VisaSubmissionListModel from "./visaSubmissionList/models/VisaSubmissionListModel";

export const addTagTypes = ["visaSubmissionLists"];
const VisaSubmissionListApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getVisaSubmissionLists: build.query({
        query: ({ submissionDate, passenger }) => ({
          url: VISASBLISTS_BY_DATE,
          params: {
            submission_date: submissionDate || "", // Send an empty string if missing
            passenger: passenger || "", // Send an empty string if missing
          },
        }),
        providesTags: ["visaSubmissionLists"],
      }),

      deleteVisaSubmissionLists: build.mutation({
        query: (visaSubmissionListId) => ({
          url: `${DELETE_VISASUBMISSIONLIST}${visaSubmissionListId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["visaSubmissionLists"],
      }),
      getVisaSubmissionList: build.query({
        query: (visaSubmissionListId) => ({
          url: `${VISASUBMISSIONLIST_BY_PASSENGER_ID}${visaSubmissionListId}`,
        }),
        providesTags: ["visaSubmissionLists"],
      }),
      createVisaSubmissionList: build.mutation({
        query: (newVisaSubmissionList) => ({
          url: CREATE_VISASUBMISSIONLIST,
          method: "POST",
          data: jsonToFormData(VisaSubmissionListModel(newVisaSubmissionList)),
        }),
        invalidatesTags: ["visaSubmissionLists"],
        async onQueryStarted({ queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error) {
            console.log("Errorcvlxzjkclxzjc", error);
            // CustomNotification(
            //   "error",
            //   `${error?.error?.response?.data?.detail}`
            // );
          }
        },
      }),
      updateVisaSubmissionList: build.mutation({
        query: (visaSubmissionList) => ({
          url: `${UPDATE_VISASUBMISSIONLIST}${visaSubmissionList.id}`,
          method: "PUT",
          data: jsonToFormData(visaSubmissionList),
        }),
        invalidatesTags: ["visaSubmissionLists"],
      }),
    }),
    overrideExisting: false,
  });
export default VisaSubmissionListApi;
export const {
  useGetVisaSubmissionListsQuery,
  useDeleteVisaSubmissionListsMutation,
  useGetVisaSubmissionListQuery,
  useUpdateVisaSubmissionListMutation,
  useDeleteVisaSubmissionListMutation,

  useCreateVisaSubmissionListMutation,
} = VisaSubmissionListApi;

export const selectFilteredVisaSubmissionLists = (visaSubmissionLists) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return visaSubmissionLists;
    }

    return FuseUtils.filterArrayByString(visaSubmissionLists, searchText);
  });
