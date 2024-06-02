import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	GET_COMPLAINS,
	GET_COMPLAIN_BY_ID,
	CREATE_COMPLAIN,
	DELETE_COMPLAIN,
	UPDATE_COMPLAIN
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import ComplainModel from './complain/models/ComplainModel';

export const addTagTypes = ['complains'];
const ComplainApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getComplains: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_COMPLAINS, params: { page, size, searchKey } }),
				providesTags: ['complains']
			}),
			deleteComplains: build.mutation({
				query: (complainIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: complainIds
				}),
				invalidatesTags: ['complains']
			}),
			getComplain: build.query({
				query: (complainId) => ({
					url: `${GET_COMPLAIN_BY_ID}${complainId}`
				}),
				providesTags: ['complains']
			}),
			createComplain: build.mutation({
				query: (newComplain) => ({
					url: CREATE_COMPLAIN,
					method: 'POST',
					data: jsonToFormData(
						ComplainModel({
							...newComplain,
							date_of_birth: moment(new Date(newComplain?.date_of_birth)).format('YYYY-MM-DD'),
							balance_date: moment(new Date(newComplain?.balance_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['complains']
			}),
			updateComplain: build.mutation({
				query: (complain) => ({
					url: `${UPDATE_COMPLAIN}${complain.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...complain,
						date_of_birth: moment(new Date(complain?.date_of_birth)).format('YYYY-MM-DD'),
						balance_date: moment(new Date(complain?.balance_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['complains']
			}),
			deleteComplain: build.mutation({
				query: (complainId) => ({
					url: `${DELETE_COMPLAIN}${complainId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['complains']
			})
		}),
		overrideExisting: false
	});
export default ComplainApi;
export const {
	useGetComplainsQuery,
	useDeleteComplainsMutation,
	useGetComplainQuery,
	useUpdateComplainMutation,
	useDeleteComplainMutation,
	useCreateComplainMutation
} = ComplainApi;

export const selectFilteredComplains = (complains) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return complains;
		}

		return FuseUtils.filterArrayByString(complains, searchText);
	});
