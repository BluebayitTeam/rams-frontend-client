import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_EMPLOYEE,
	DELETE_EMPLOYEE,
	GET_EMPLOYEES,
	GET_EMPLOYEE_BY_ID,
	UPDATE_EMPLOYEE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PassengerSummaryUpdateClmModel from './passengerSummaryUpdateClm/models/PassengerSummaryUpdateClmModel';

export const addTagTypes = ['passengerSummaryUpdateClms'];
const PassengerSummaryUpdateClmApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerSummaryUpdateClms: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_EMPLOYEES, params: { page, size, searchKey } }),
				providesTags: ['passengerSummaryUpdateClms']
			}),
			deletePassengerSummaryUpdateClms: build.mutation({
				query: (passengerSummaryUpdateClmIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: passengerSummaryUpdateClmIds
				}),
				invalidatesTags: ['passengerSummaryUpdateClms']
			}),
			getPassengerSummaryUpdateClm: build.query({
				query: (passengerSummaryUpdateClmId) => ({
					url: `${GET_EMPLOYEE_BY_ID}${passengerSummaryUpdateClmId}`
				}),
				providesTags: ['passengerSummaryUpdateClms']
			}),
			createPassengerSummaryUpdateClm: build.mutation({
				query: (newPassengerSummaryUpdateClm) => ({
					url: CREATE_EMPLOYEE,
					method: 'POST',
					data: jsonToFormData(PassengerSummaryUpdateClmModel(newPassengerSummaryUpdateClm))
				}),
				invalidatesTags: ['passengerSummaryUpdateClms']
			}),
			updatePassengerSummaryUpdateClm: build.mutation({
				query: (passengerSummaryUpdateClm) => ({
					url: `${UPDATE_EMPLOYEE}${passengerSummaryUpdateClm.id}`,
					method: 'PUT',
					data: jsonToFormData(passengerSummaryUpdateClm)
				}),
				invalidatesTags: ['passengerSummaryUpdateClms']
			}),
			deletePassengerSummaryUpdateClm: build.mutation({
				query: (passengerSummaryUpdateClmId) => ({
					url: `${DELETE_EMPLOYEE}${passengerSummaryUpdateClmId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['passengerSummaryUpdateClms']
			})
		}),
		overrideExisting: false
	});
export default PassengerSummaryUpdateClmApi;
export const {
	useGetPassengerSummaryUpdateClmsQuery,
	useDeletePassengerSummaryUpdateClmsMutation,
	useGetPassengerSummaryUpdateClmQuery,
	useUpdatePassengerSummaryUpdateClmMutation,
	useDeletePassengerSummaryUpdateClmMutation,

	useCreatePassengerSummaryUpdateClmMutation
} = PassengerSummaryUpdateClmApi;

export const selectFilteredPassengerSummaryUpdateClms = (passengerSummaryUpdateClms) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return passengerSummaryUpdateClms;
		}

		return FuseUtils.filterArrayByString(passengerSummaryUpdateClms, searchText);
	});
