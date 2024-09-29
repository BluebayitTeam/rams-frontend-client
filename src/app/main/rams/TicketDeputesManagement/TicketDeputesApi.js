import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TICKETDEPUTE,
	DELETE_TICKETDEPUTE,
	DELETE_TICKETDEPUTE_MULTIPLE,
	GET_TICKETDEPUTES,
	GET_TICKETDEPUTE_BY_ID,
	UPDATE_TICKETDEPUTE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TicketDeputeModel from './ticketDepute/models/TicketDeputeModel';

export const addTagTypes = ['ticketDeputes'];
const TicketDeputeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTicketDeputes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_TICKETDEPUTES, params: { page, size, searchKey } }),
				providesTags: ['ticketDeputes']
			}),
			deleteTicketDeputes: build.mutation({
				query: (ticketDeputeIds) => ({
					url: DELETE_TICKETDEPUTE_MULTIPLE,
					method: 'DELETE',
					data: { ids: ticketDeputeIds }
				}),
				invalidatesTags: ['ticketDeputes']
			}),
			getTicketDepute: build.query({
				query: (ticketDeputeId) => ({
					url: `${GET_TICKETDEPUTE_BY_ID}${ticketDeputeId}`
				}),
				providesTags: ['ticketDeputes']
			}),
			createTicketDepute: build.mutation({
				query: (newTicketDepute) => ({
					url: CREATE_TICKETDEPUTE,
					method: 'POST',
					data: jsonToFormData(TicketDeputeModel(newTicketDepute))
				}),
				invalidatesTags: ['ticketDeputes']
			}),
			updateTicketDepute: build.mutation({
				query: (ticketDepute) => ({
					url: `${UPDATE_TICKETDEPUTE}${ticketDepute.id}`,
					method: 'PUT',
					data: jsonToFormData(ticketDepute)
				}),
				invalidatesTags: ['ticketDeputes']
			}),
			deleteTicketDepute: build.mutation({
				query: (ticketDeputeId) => ({
					url: `${DELETE_TICKETDEPUTE}${ticketDeputeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ticketDeputes']
			})
		}),
		overrideExisting: false
	});
export default TicketDeputeApi;
export const {
	useGetTicketDeputesQuery,
	useDeleteTicketDeputesMutation,
	useGetTicketDeputeQuery,
	useUpdateTicketDeputeMutation,
	useDeleteTicketDeputeMutation,

	useCreateTicketDeputeMutation
} = TicketDeputeApi;

export const selectFilteredTicketDeputes = (ticketDeputes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ticketDeputes;
		}

		return FuseUtils.filterArrayByString(ticketDeputes, searchText);
	});
