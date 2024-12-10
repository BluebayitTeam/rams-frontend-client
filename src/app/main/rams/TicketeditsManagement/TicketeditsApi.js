import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TICKETDEPUTE,
	DELETE_TICKETDEPUTE,
	DELETE_TICKETDEPUTE_MULTIPLE,
	GET_TICKETDEPUTES,
	GET_TICKETDEPUTE_BY_ID,
	GET_TICKETEDITS,
	UPDATE_TICKETDEPUTE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TicketeditModel from './ticketedit/models/TicketeditModel';

export const addTagTypes = ['ticketedits'];
const TicketeditApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTicketedits: build.query({
        query: ({ page, size }) => ({
          url: GET_TICKETEDITS,
          params: { page, size },
        }),
        providesTags: ['ticketedits'],
      }),
      deleteTicketedits: build.mutation({
        query: (ticketeditIds) => ({
          url: DELETE_TICKETDEPUTE_MULTIPLE,
          method: 'DELETE',
          data: { ids: ticketeditIds },
        }),
        invalidatesTags: ['ticketedits'],
      }),
      getTicketedit: build.query({
        query: (ticketeditId) => ({
          url: `${GET_TICKETDEPUTE_BY_ID}${ticketeditId}`,
        }),
        providesTags: ['ticketedits'],
      }),
      createTicketedit: build.mutation({
        query: (newTicketedit) => ({
          url: CREATE_TICKETDEPUTE,
          method: 'POST',
          data: jsonToFormData(TicketeditModel(newTicketedit)),
        }),
        invalidatesTags: ['ticketedits'],
      }),
      updateTicketedit: build.mutation({
        query: (ticketedit) => ({
          url: `${UPDATE_TICKETDEPUTE}${ticketedit.id}`,
          method: 'PUT',
          data: jsonToFormData(ticketedit),
        }),
        invalidatesTags: ['ticketedits'],
      }),
      deleteTicketedit: build.mutation({
        query: (ticketeditId) => ({
          url: `${DELETE_TICKETDEPUTE}${ticketeditId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['ticketedits'],
      }),
    }),
    overrideExisting: false,
  });
export default TicketeditApi;
export const {
	useGetTicketeditsQuery,
	useDeleteTicketeditsMutation,
	useGetTicketeditQuery,
	useUpdateTicketeditMutation,
	useDeleteTicketeditMutation,

	useCreateTicketeditMutation
} = TicketeditApi;

export const selectFilteredTicketedits = (ticketedits) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ticketedits;
		}

		return FuseUtils.filterArrayByString(ticketedits, searchText);
	});
