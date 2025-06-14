import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import {
  CREATE_EMBASSY,
  UPDATE_EMBASSY,
  DELETE_EMBASSY,
  EMBASSY_BY_PASSENGER_IDS,
} from "src/app/constant/constants";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import { selectSearchText } from "./store/searchTextSlice";
import EmbassyModel from "./embassy/models/EmbassyModel";
// import EmbassyModel from './embassy/models/EmbassyModel';

export const addTagTypes = ["embassys"];
const EmbassyApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getEmbassy: build.query({
        query: (embassyId) => ({
          url: `${EMBASSY_BY_PASSENGER_IDS}${embassyId}`,
        }),
        providesTags: ["embassys"],
      }),
      createEmbassy: build.mutation({
        query: (newEmbassy) => ({
          url: CREATE_EMBASSY,
          method: "POST",
          data: jsonToFormData(
            EmbassyModel(
              newEmbassy
              // delivery_date: moment(new Date(newEmbassy?.delivery_date)).format('YYYY-MM-DD')
            )
          ),
        }),
        invalidatesTags: ["embassys"],
      }),
      updateEmbassy: build.mutation({
        query: (embassy) => ({
          url: `${UPDATE_EMBASSY}${embassy.id}`,
          method: "PUT",
          data: jsonToFormData(
            embassy
            // delivery_date: moment(new Date(embassy?.delivery_date)).format('YYYY-MM-DD')
          ),
        }),
        invalidatesTags: ["embassys"],
      }),
      deleteEmbassy: build.mutation({
        query: (embassyId) => ({
          url: `${DELETE_EMBASSY}${embassyId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["embassys"],
      }),
    }),
    overrideExisting: false,
  });
export default EmbassyApi;
export const {
  useGetEmbassysQuery,
  useDeleteEmbassysMutation,
  useGetEmbassyQuery,
  useUpdateEmbassyMutation,
  useDeleteEmbassyMutation,
  useCreateEmbassyMutation,
} = EmbassyApi;

export const selectFilteredEmbassys = (embassys) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return embassys;
    }

    return FuseUtils.filterArrayByString(embassys, searchText);
  });
