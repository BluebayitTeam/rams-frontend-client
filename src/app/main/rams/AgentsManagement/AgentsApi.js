import { apiService as api } from "app/store/apiService";
import { createSelector } from "@reduxjs/toolkit";
import FuseUtils from "@fuse/utils";
import {
  ALL_USERS,
  GET_AGENTS,
  GET_AGENT_BY_ID,
  CREATE_AGENT,
  DELETE_AGENT,
  UPDATE_AGENT,
} from "src/app/constant/constants";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import moment from "moment";
import { selectSearchText } from "./store/searchTextSlice";
import AgentModel from "./agent/models/AgentModel";

export const addTagTypes = ["agents"];
const AgentApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAgents: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_AGENTS,
          params: { page, size, searchKey },
        }),
        providesTags: ["agents"],
      }),
      deleteAgents: build.mutation({
        query: (agentIds) => ({
          url: ALL_USERS,
          method: "DELETE",
          data: agentIds,
        }),
        invalidatesTags: ["agents"],
      }),
      getAgent: build.query({
        query: (agentId) => ({
          url: `${GET_AGENT_BY_ID}${agentId}`,
        }),
        providesTags: ["agents"],
      }),
      createAgent: build.mutation({
        query: (newAgent) => ({
          url: CREATE_AGENT,
          method: "POST",
          data: jsonToFormData(
            AgentModel({
              ...newAgent,
              // date_of_birth: moment(new Date(newAgent?.date_of_birth)).format('YYYY-MM-DD'),
              date_of_birth: moment(new Date(newAgent?.date_of_birth)).format(
                "YYYY-MM-DD"
              ),
            })
          ),
        }),
        invalidatesTags: ["agents"],
      }),
      updateAgent: build.mutation({
        query: (agent) => ({
          url: `${UPDATE_AGENT}${agent.id}`,
          method: "PUT",
          data: jsonToFormData({
            ...agent,
            // date_of_birth: moment(new Date(agent?.date_of_birth)).format('YYYY-MM-DD'),
            date_of_birth: moment(new Date(agent?.date_of_birth)).format(
              "YYYY-MM-DD"
            ),
          }),
        }),
        invalidatesTags: ["agents"],
      }),
      deleteAgent: build.mutation({
        query: (agentId) => ({
          url: `${DELETE_AGENT}${agentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["agents"],
      }),
    }),
    overrideExisting: false,
  });
export default AgentApi;
export const {
  useGetAgentsQuery,
  useDeleteAgentsMutation,
  useGetAgentQuery,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
  useCreateAgentMutation,
} = AgentApi;

export const selectFilteredAgents = (agents) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return agents;
    }

    return FuseUtils.filterArrayByString(agents, searchText);
  });
