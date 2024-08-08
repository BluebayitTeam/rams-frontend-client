import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_THANA,
	DELETE_THANA,
	DELETE_THANA_MULTIPLE,
	GET_THANAS,
	GET_THANA_BY_ID,
	UPDATE_THANA
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PoliceStationModel from './policeStation/models/PoliceStationModel';

export const addTagTypes = ['policeStations'];
const PoliceStationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPoliceStations: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_THANAS, params: { page, size, searchKey } }),
				providesTags: ['policeStations']
			}),
			deletePoliceStations: build.mutation({
				query: (policeStationIds) => ({
					url: DELETE_THANA_MULTIPLE,
					method: 'DELETE',
					data: { ids: policeStationIds }
				}),
				invalidatesTags: ['policeStations']
			}),
			getPoliceStation: build.query({
				query: (policeStationId) => ({
					url: `${GET_THANA_BY_ID}${policeStationId}`
				}),
				providesTags: ['policeStations']
			}),
			createPoliceStation: build.mutation({
				query: (newPoliceStation) => ({
					url: CREATE_THANA,
					method: 'POST',
					data: jsonToFormData(PoliceStationModel(newPoliceStation))
				}),
				invalidatesTags: ['policeStations']
			}),
			updatePoliceStation: build.mutation({
				query: (policeStation) => ({
					url: `${UPDATE_THANA}${policeStation.id}`,
					method: 'PUT',
					data: jsonToFormData(policeStation)
				}),
				invalidatesTags: ['policeStations']
			}),
			deletePoliceStation: build.mutation({
				query: (policeStationId) => ({
					url: `${DELETE_THANA}${policeStationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['policeStations']
			})
		}),
		overrideExisting: false
	});
export default PoliceStationApi;
export const {
	useGetPoliceStationsQuery,
	useDeletePoliceStationsMutation,
	useGetPoliceStationQuery,
	useUpdatePoliceStationMutation,
	useDeletePoliceStationMutation,

	useCreatePoliceStationMutation
} = PoliceStationApi;

export const selectFilteredPoliceStations = (policeStations) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return policeStations;
		}

		return FuseUtils.filterArrayByString(policeStations, searchText);
	});
