import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_CITY,
	DELETE_CITY,
	DELETE_CITY_MULTIPLE,
	GET_CITYS,
	GET_CITY_BY_ID,
	UPDATE_CITY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import DistrictModel from './district/models/DistrictModel';

export const addTagTypes = ['districts'];
const DistrictApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDistricts: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CITYS, params: { page, size, searchKey } }),
				providesTags: ['districts']
			}),
			deleteDistricts: build.mutation({
				query: (districtIds) => ({
					url: DELETE_CITY_MULTIPLE,
					method: 'DELETE',
					data: { ids: districtIds }
				}),
				invalidatesTags: ['districts']
			}),
			getDistrict: build.query({
				query: (districtId) => ({
					url: `${GET_CITY_BY_ID}${districtId}`
				}),
				providesTags: ['districts']
			}),
			createDistrict: build.mutation({
				query: (newDistrict) => ({
					url: CREATE_CITY,
					method: 'POST',
					data: jsonToFormData(DistrictModel(newDistrict))
				}),
				invalidatesTags: ['districts']
			}),
			updateDistrict: build.mutation({
				query: (district) => ({
					url: `${UPDATE_CITY}${district.id}`,
					method: 'PUT',
					data: jsonToFormData(district)
				}),
				invalidatesTags: ['districts']
			}),
			deleteDistrict: build.mutation({
				query: (districtId) => ({
					url: `${DELETE_CITY}${districtId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['districts']
			})
		}),
		overrideExisting: false
	});
export default DistrictApi;
export const {
	useGetDistrictsQuery,
	useDeleteDistrictsMutation,
	useGetDistrictQuery,
	useUpdateDistrictMutation,
	useDeleteDistrictMutation,

	useCreateDistrictMutation
} = DistrictApi;

export const selectFilteredDistricts = (districts) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return districts;
		}

		return FuseUtils.filterArrayByString(districts, searchText);
	});
