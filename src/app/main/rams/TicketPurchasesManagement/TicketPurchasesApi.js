import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TICKETENTRY,
	DELETE_TICKETENTRY,
	DELETE_TICKETENTRY_MULTIPLE,
	GET_TICKETENTRYS,
	GET_TICKETENTRY_BY_ID,
	UPDATE_TICKETENTRY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TicketPurchaseModel from './ticketPurchase/models/TicketPurchaseModel';

export const addTagTypes = ['ticketPurchases'];
const TicketPurchaseApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTicketPurchases: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_TICKETENTRYS, params: { page, size, searchKey } }),
				providesTags: ['ticketPurchases']
			}),
			deleteTicketPurchases: build.mutation({
				query: (ticketPurchaseIds) => ({
					url: DELETE_TICKETENTRY_MULTIPLE,
					method: 'DELETE',
					data: { ids: ticketPurchaseIds }
				}),
				invalidatesTags: ['ticketPurchases']
			}),
			getTicketPurchase: build.query({
				query: (ticketPurchaseId) => ({
					url: `${GET_TICKETENTRY_BY_ID}${ticketPurchaseId}`
				}),
				providesTags: ['ticketPurchases']
			}),
			createTicketPurchase: build.mutation({
				query: (newTicketPurchase) => ({
					url: CREATE_TICKETENTRY,
					method: 'POST',
					data: jsonToFormData(TicketPurchaseModel(newTicketPurchase))
				}),
				invalidatesTags: ['ticketPurchases']
			}),
			updateTicketPurchase: build.mutation({
				query: (ticketPurchase) => ({
					url: `${UPDATE_TICKETENTRY}${ticketPurchase.id}`,
					method: 'PUT',
					data: jsonToFormData(ticketPurchase)
				}),
				invalidatesTags: ['ticketPurchases']
			}),
			deleteTicketPurchase: build.mutation({
				query: (ticketPurchaseId) => ({
					url: `${DELETE_TICKETENTRY}${ticketPurchaseId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ticketPurchases']
			})
		}),
		overrideExisting: false
	});
export default TicketPurchaseApi;
export const {
	useGetTicketPurchasesQuery,
	useDeleteTicketPurchasesMutation,
	useGetTicketPurchaseQuery,
	useUpdateTicketPurchaseMutation,
	useDeleteTicketPurchaseMutation,

	useCreateTicketPurchaseMutation
} = TicketPurchaseApi;

export const selectFilteredTicketPurchases = (ticketPurchases) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ticketPurchases;
		}

		return FuseUtils.filterArrayByString(ticketPurchases, searchText);
	});
