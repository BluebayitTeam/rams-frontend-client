import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  GET_MAKEALIST_CLM_BY_LIST_ID,
  UPDATE_MAKEALIST_CLM,
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['makeListColumn'];
const MakeListColumnApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMakeListColumn: build.query({
        query: (makeListColumnsId) => ({
          url: `${GET_MAKEALIST_CLM_BY_LIST_ID}${makeListColumnsId}`,
        }),
        providesTags: ['makeListColumn'],
      }),
      updateMakeListColumn: build.mutation({
        query: (data) => {
          console.log('data', data.id);
          return {
            url: `${UPDATE_MAKEALIST_CLM}${data?.id}`,
            method: 'PUT',
            data,
          };
        },

        invalidatesTags: ['makeListColumn'],
      }),
      // createMakeListColumn: build.mutation({
      //   query: (newMakeListColumn) => ({
      //     url: CREATE_CLIENT,
      //     method: 'POST',
      //     data: jsonToFormData(MakeListColumnModel(newMakeListColumn)),
      //   }),
      //   invalidatesTags: ['makeListColumn'],
      // }),
    }),
    overrideExisting: false,
  });
export default MakeListColumnApi;
export const {
  useGetMakeListColumnQuery,
  useDeleteMakeListColumnMutation,
  useUpdateMakeListColumnMutation,
} = MakeListColumnApi;

export const selectFilteredMakeListColumn = (makeListColumn) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return makeListColumn;
    }

    return FuseUtils.filterArrayByString(makeListColumn, searchText);
  });
