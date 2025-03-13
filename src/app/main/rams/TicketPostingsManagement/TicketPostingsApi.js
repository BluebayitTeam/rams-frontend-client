import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_TICKETPOSTING, UPDATE_DEMAND_ASSIGN } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import TicketPostingModel from './ticketPosting/models/TicketPostingModel';

export const addTagTypes = ['ticketPostings'];
const TicketPostingApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createTicketPosting: build.mutation({
        query: (newTicketPosting) => ({
          url: CREATE_TICKETPOSTING,
          method: 'POST',
          data: newTicketPosting,
        }),
        invalidatesTags: ['ticketPostings'],
       
      }),
    }),
    overrideExisting: false,
  });
export default TicketPostingApi;
export const { useCreateTicketPostingMutation } = TicketPostingApi;

export const selectFilteredTicketPostings = (ticketPostings) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ticketPostings;
		}

		return FuseUtils.filterArrayByString(ticketPostings, searchText);
	});
