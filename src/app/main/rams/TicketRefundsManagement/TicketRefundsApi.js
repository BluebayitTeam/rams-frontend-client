import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TICKETREFUND,
	DELETE_TICKETREFUND,
	DELETE_TICKETREFUND_MULTIPLE,
	GET_TICKETREFUNDS,
	GET_TICKETREFUND_BY_ID,
	UPDATE_TICKETREFUND
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import TicketRefundModel from './ticketRefund/models/TicketRefundModel';

export const addTagTypes = ['ticketRefunds'];
const TicketRefundApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTicketRefunds: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_TICKETREFUNDS, params: { page, size, searchKey } }),
				providesTags: ['ticketRefunds']
			}),
			deleteTicketRefunds: build.mutation({
				query: (ticketRefundIds) => ({
					url: DELETE_TICKETREFUND_MULTIPLE,
					method: 'DELETE',
					data: { ids: ticketRefundIds }
				}),
				invalidatesTags: ['ticketRefunds']
			}),
			getTicketRefund: build.query({
				query: (ticketRefundId) => ({
					url: `${GET_TICKETREFUND_BY_ID}${ticketRefundId}`
				}),
				providesTags: ['ticketRefunds']
			}),
			createTicketRefund: build.mutation({
				query: (newTicketRefund) => ({
					url: CREATE_TICKETREFUND,
					method: 'POST',
					data: jsonToFormData(TicketRefundModel(newTicketRefund))
				}),
				invalidatesTags: ['ticketRefunds']
			}),
			updateTicketRefund: build.mutation({
				query: (ticketRefund) => ({
					url: `${UPDATE_TICKETREFUND}${ticketRefund.id}`,
					method: 'PUT',
					data: jsonToFormData(ticketRefund)
				}),
				invalidatesTags: ['ticketRefunds']
			}),
			deleteTicketRefund: build.mutation({
				query: (ticketRefundId) => ({
					url: `${DELETE_TICKETREFUND}${ticketRefundId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ticketRefunds']
			})
		}),
		overrideExisting: false
	});
export default TicketRefundApi;
export const {
	useGetTicketRefundsQuery,
	useDeleteTicketRefundsMutation,
	useGetTicketRefundQuery,
	useUpdateTicketRefundMutation,
	useDeleteTicketRefundMutation,

	useCreateTicketRefundMutation
} = TicketRefundApi;

export const selectFilteredTicketRefunds = (ticketRefunds) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ticketRefunds;
		}

		return FuseUtils.filterArrayByString(ticketRefunds, searchText);
	});
