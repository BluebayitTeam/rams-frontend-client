import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_CURRENTSTATUS,
	DELETE_CURRENTSTATUS,
	DELETE_CURRENTSTATUS_MULTIPLE,
	GET_CURRENTSTATUSS,
	GET_CURRENTSTATUS_BY_ID,
	UPDATE_CURRENTSTATUS
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CurrentStatusModel from './currentStatus/models/CurrentStatusModel';

export const addTagTypes = ['currentStatuss'];
const CurrentStatusApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCurrentStatuss: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CURRENTSTATUSS, params: { page, size, searchKey } }),
				providesTags: ['currentStatuss']
			}),
			deleteCurrentStatuss: build.mutation({
				query: (currentStatusIds) => ({
					url: DELETE_CURRENTSTATUS_MULTIPLE,
					method: 'DELETE',
					data: { ids: currentStatusIds }
				}),
				invalidatesTags: ['currentStatuss']
			}),
			getCurrentStatus: build.query({
				query: (currentStatusId) => ({
					url: `${GET_CURRENTSTATUS_BY_ID}${currentStatusId}`
				}),
				providesTags: ['currentStatuss']
			}),
			createCurrentStatus: build.mutation({
				query: (newCurrentStatus) => ({
					url: CREATE_CURRENTSTATUS,
					method: 'POST',
					data: jsonToFormData(CurrentStatusModel(newCurrentStatus))
				}),
				invalidatesTags: ['currentStatuss']
			}),
			updateCurrentStatus: build.mutation({
				query: (currentStatus) => ({
					url: `${UPDATE_CURRENTSTATUS}${currentStatus.id}`,
					method: 'PUT',
					data: jsonToFormData(currentStatus)
				}),
				invalidatesTags: ['currentStatuss']
			}),
			deleteCurrentStatus: build.mutation({
				query: (currentStatusId) => ({
					url: `${DELETE_CURRENTSTATUS}${currentStatusId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['currentStatuss']
			})
		}),
		overrideExisting: false
	});
export default CurrentStatusApi;
export const {
	useGetCurrentStatussQuery,
	useDeleteCurrentStatussMutation,
	useGetCurrentStatusQuery,
	useUpdateCurrentStatusMutation,
	useDeleteCurrentStatusMutation,

	useCreateCurrentStatusMutation
} = CurrentStatusApi;

export const selectFilteredCurrentStatuss = (currentStatuss) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return currentStatuss;
		}

		return FuseUtils.filterArrayByString(currentStatuss, searchText);
	});
