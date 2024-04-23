import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_FEATURE_DETAIL,
	DELETE_FEATURE_DETAIL,
	GET_FEATURE_DETAILS,
	GET_FEATURE_DETAIL_BY_ID,
	UPDATE_FEATURE_DETAIL
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import FeatureDetailModel from './featureDetail/models/FeatureDetailModel';

export const addTagTypes = ['featureDetails'];
const FeatureDetailApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFeatureDetails: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_FEATURE_DETAILS, params: { page, size, searchKey } }),
				providesTags: ['featureDetails']
			}),
			deleteFeatureDetails: build.mutation({
				query: (featureDetailIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: featureDetailIds
				}),
				invalidatesTags: ['featureDetails']
			}),
			getFeatureDetail: build.query({
				query: (featureDetailId) => ({
					url: `${GET_FEATURE_DETAIL_BY_ID}${featureDetailId}`
				}),
				providesTags: ['featureDetails']
			}),
			createFeatureDetail: build.mutation({
				query: (newFeatureDetail) => ({
					url: CREATE_FEATURE_DETAIL,
					method: 'POST',
					data: FeatureDetailModel({
						...newFeatureDetail
					})
				}),
				invalidatesTags: ['featureDetails']
			}),
			updateFeatureDetail: build.mutation({
				query: (featureDetail) => ({
					url: `${UPDATE_FEATURE_DETAIL}${featureDetail.id}`,
					method: 'PUT',
					data: {
						...featureDetail
					}
				}),
				invalidatesTags: ['featureDetails']
			}),
			deleteFeatureDetail: build.mutation({
				query: (featureDetailId) => ({
					url: `${DELETE_FEATURE_DETAIL}${featureDetailId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['featureDetails']
			})
		}),
		overrideExisting: false
	});
export default FeatureDetailApi;
export const {
	useGetFeatureDetailsQuery,
	useDeleteFeatureDetailsMutation,
	useGetFeatureDetailQuery,
	useUpdateFeatureDetailMutation,
	useDeleteFeatureDetailMutation,

	useCreateFeatureDetailMutation
} = FeatureDetailApi;

export const selectFilteredFeatureDetails = (featureDetails) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return featureDetails;
		}

		return FuseUtils.filterArrayByString(featureDetails, searchText);
	});
