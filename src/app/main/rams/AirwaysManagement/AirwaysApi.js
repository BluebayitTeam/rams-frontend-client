import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_AIRWAY,
	DELETE_AIRWAY,
	DELETE_AIRWAY_MULTIPLE,
	GET_AIRWAYID,
	GET_AIRWAYS,
	UPDATE_AIRWAY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import AirwayModel from './airway/models/AirwayModel';

export const addTagTypes = ['airways'];
const AirwayApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAirways: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_AIRWAYS, params: { page, size, searchKey } }),
				providesTags: ['airways']
			}),
			deleteAirways: build.mutation({
				query: (airwayIds) => ({
					url: DELETE_AIRWAY_MULTIPLE,
					method: 'DELETE',
					data: { ids: airwayIds }
				}),
				invalidatesTags: ['airways']
			}),
			getAirway: build.query({
				query: (airwayId) => ({
					url: `${GET_AIRWAYID}${airwayId}`
				}),
				providesTags: ['airways']
			}),
			createAirway: build.mutation({
				query: (newAirway) => ({
					url: CREATE_AIRWAY,
					method: 'POST',
					data: jsonToFormData(AirwayModel(newAirway))
				}),
				invalidatesTags: ['airways']
			}),
			updateAirway: build.mutation({
				query: (airway) => ({
					url: `${UPDATE_AIRWAY}${airway.id}`,
					method: 'PUT',
					data: jsonToFormData(airway)
				}),
				invalidatesTags: ['airways']
			}),
			deleteAirway: build.mutation({
				query: (airwayId) => ({
					url: `${DELETE_AIRWAY}${airwayId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['airways']
			})
		}),
		overrideExisting: false
	});
export default AirwayApi;
export const {
	useGetAirwaysQuery,
	useDeleteAirwaysMutation,
	useGetAirwayQuery,
	useUpdateAirwayMutation,
	useDeleteAirwayMutation,

	useCreateAirwayMutation
} = AirwayApi;

export const selectFilteredAirways = (airways) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return airways;
		}

		return FuseUtils.filterArrayByString(airways, searchText);
	});
