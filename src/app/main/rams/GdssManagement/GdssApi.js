import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_GDS,
	DELETE_GDS,
	DELETE_GDS_MULTIPLE,
	GET_AIRWAYID,
	GET_GDSS,
	UPDATE_GDS
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import GdsModel from './gds/models/GdsModel';

export const addTagTypes = ['gdss'];
const GdsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getGdss: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_GDSS, params: { page, size, searchKey } }),
				providesTags: ['gdss']
			}),
			deleteGdss: build.mutation({
				query: (gdsIds) => ({
					url: DELETE_GDS_MULTIPLE,
					method: 'DELETE',
					data: { ids: gdsIds }
				}),
				invalidatesTags: ['gdss']
			}),
			getGds: build.query({
				query: (gdsId) => ({
					url: `${GET_AIRWAYID}${gdsId}`
				}),
				providesTags: ['gdss']
			}),
			createGds: build.mutation({
				query: (newGds) => ({
					url: CREATE_GDS,
					method: 'POST',
					data: jsonToFormData(GdsModel(newGds))
				}),
				invalidatesTags: ['gdss']
			}),
			updateGds: build.mutation({
				query: (gds) => ({
					url: `${UPDATE_GDS}${gds.id}`,
					method: 'PUT',
					data: jsonToFormData(gds)
				}),
				invalidatesTags: ['gdss']
			}),
			deleteGds: build.mutation({
				query: (gdsId) => ({
					url: `${DELETE_GDS}${gdsId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['gdss']
			})
		}),
		overrideExisting: false
	});
export default GdsApi;
export const {
	useGetGdssQuery,
	useDeleteGdssMutation,
	useGetGdsQuery,
	useUpdateGdsMutation,
	useDeleteGdsMutation,

	useCreateGdsMutation
} = GdsApi;

export const selectFilteredGdss = (gdss) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return gdss;
		}

		return FuseUtils.filterArrayByString(gdss, searchText);
	});
