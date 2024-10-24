import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  ALL_USERS,
  GET_SUBAGENTS,
  GET_SUBAGENT_BY_ID,
  CREATE_SUBAGENT,
  DELETE_SUBAGENT,
  UPDATE_SUBAGENT,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import SubAgentModel from './subAgent/models/SubAgentModel';

export const addTagTypes = ['subAgents'];
const SubAgentApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSubAgents: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_SUBAGENTS,
          params: { page, size, searchKey },
        }),
        providesTags: ['subAgents'],
      }),
      deleteSubAgents: build.mutation({
        query: (subAgentIds) => ({
          url: ALL_USERS,
          method: 'DELETE',
          data: subAgentIds,
        }),
        invalidatesTags: ['subAgents'],
      }),
      getSubAgent: build.query({
        query: (subAgentId) => ({
          url: `${GET_SUBAGENT_BY_ID}${subAgentId}`,
        }),
        providesTags: ['subAgents'],
      }),
      createSubAgent: build.mutation({
        query: (newSubAgent) => ({
          url: CREATE_SUBAGENT,
          method: 'POST',
          data: jsonToFormData(
            SubAgentModel({
              ...newSubAgent,
              // date_of_birth: moment(new Date(newSubAgent?.date_of_birth)).format('YYYY-MM-DD'),
              balance_date: moment(new Date(newSubAgent?.balance_date)).format(
                'YYYY-MM-DD'
              ),
            })
          ),
        }),
        invalidatesTags: ['subAgents'],
      }),
      updateSubAgent: build.mutation({
        query: (subAgent) => ({
          url: `${UPDATE_SUBAGENT}${subAgent.id}`,
          method: 'PUT',
          data: jsonToFormData({
            ...subAgent,
            // date_of_birth: moment(new Date(subAgent?.date_of_birth)).format('YYYY-MM-DD'),
            balance_date: moment(new Date(subAgent?.balance_date)).format(
              'YYYY-MM-DD'
            ),
          }),
        }),
        invalidatesTags: ['subAgents'],
      }),
      deleteSubAgent: build.mutation({
        query: (subAgentId) => ({
          url: `${DELETE_SUBAGENT}${subAgentId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['subAgents'],
      }),
    }),
    overrideExisting: false,
  });
export default SubAgentApi;
export const {
  useGetSubAgentsQuery,
  useDeleteSubAgentsMutation,
  useGetSubAgentQuery,
  useUpdateSubAgentMutation,
  useDeleteSubAgentMutation,
  useCreateSubAgentMutation,
} = SubAgentApi;

export const selectFilteredSubAgents = (subAgents) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return subAgents;
    }

    return FuseUtils.filterArrayByString(subAgents, searchText);
  });
