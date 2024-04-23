import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_LOAN,
	DELETE_LOAN,
	GET_LOANS,
	GET_LOAN_BY_ID,
	UPDATE_LOAN
} from 'src/app/constant/constants';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import SubscriptionLoanModel from './subscriptionLoan/models/SubscriptionLoanModel';

export const addTagTypes = ['subscriptionLoans'];
const SubscriptionLoanApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSubscriptionLoans: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_LOANS, params: { page, size, searchKey } }),
				providesTags: ['subscriptionLoans']
			}),
			deleteSubscriptionLoans: build.mutation({
				query: (subscriptionLoanIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: subscriptionLoanIds
				}),
				invalidatesTags: ['subscriptionLoans']
			}),
			getSubscriptionLoan: build.query({
				query: (subscriptionLoanId) => ({
					url: `${GET_LOAN_BY_ID}${subscriptionLoanId}`
				}),
				providesTags: ['subscriptionLoans']
			}),
			createSubscriptionLoan: build.mutation({
				query: (newSubscriptionLoan) => ({
					url: CREATE_LOAN,
					method: 'POST',
					data: SubscriptionLoanModel({
						...newSubscriptionLoan,
						loan_end_date: moment(new Date(newSubscriptionLoan?.loan_end_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['subscriptionLoans']
			}),
			updateSubscriptionLoan: build.mutation({
				query: (subscriptionLoan) => ({
					url: `${UPDATE_LOAN}${subscriptionLoan.id}`,
					method: 'PUT',
					data: {
						...subscriptionLoan,
						loan_end_date: moment(new Date(subscriptionLoan?.loan_end_date)).format('YYYY-MM-DD')
					}
				}),
				invalidatesTags: ['subscriptionLoans']
			}),
			deleteSubscriptionLoan: build.mutation({
				query: (subscriptionLoanId) => ({
					url: `${DELETE_LOAN}${subscriptionLoanId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['subscriptionLoans']
			})
		}),
		overrideExisting: false
	});
export default SubscriptionLoanApi;
export const {
	useGetSubscriptionLoansQuery,
	useDeleteSubscriptionLoansMutation,
	useGetSubscriptionLoanQuery,
	useUpdateSubscriptionLoanMutation,
	useDeleteSubscriptionLoanMutation,

	useCreateSubscriptionLoanMutation
} = SubscriptionLoanApi;

export const selectFilteredSubscriptionLoans = (subscriptionLoans) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return subscriptionLoans;
		}

		return FuseUtils.filterArrayByString(subscriptionLoans, searchText);
	});
