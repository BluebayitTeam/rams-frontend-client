import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { UPDATE_CALLING_ASSIGN } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import CallingAssignModel from './docmentSend/models/CallingAssignModel';

export const addTagTypes = ['callingAssigns'];
const CallingAssignApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			createCallingAssign: build.mutation({
				query: (newCallingAssign) => ({
					url: UPDATE_CALLING_ASSIGN,
					method: 'PUT',
					data: CallingAssignModel({
						visa_entry: newCallingAssign?.visa_entry,
						status: newCallingAssign?.current_status,
						passengers: newCallingAssign?.passengers
					})
				}),
				invalidatesTags: ['callingAssigns']
			})
		}),
		overrideExisting: false
	});
export default CallingAssignApi;
export const { useCreateCallingAssignMutation } = CallingAssignApi;

export const selectFilteredCallingAssigns = (callingAssigns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingAssigns;
		}

		return FuseUtils.filterArrayByString(callingAssigns, searchText);
	});
