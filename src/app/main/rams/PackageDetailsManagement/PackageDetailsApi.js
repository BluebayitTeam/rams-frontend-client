import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_CLIENT,
	GET_CLIENTS,
	GET_PACKAGE_DETAIL_BY_ID,
	UPDATE_PACKAGE_DETAIL
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import PackageDetailModel from './packageDetail/models/PackageDetailModel';

export const addTagTypes = ['packageDetails'];
const PackageDetailApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPackageDetails: build.query({
				query: () => ({ url: GET_CLIENTS }),
				providesTags: ['packageDetails']
			}),
			deletePackageDetails: build.mutation({
				query: (packageDetailIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: packageDetailIds
				}),
				invalidatesTags: ['packageDetails']
			}),
			getPackageDetail: build.query({
				query: (packageDetailId) => ({
					url: `${GET_PACKAGE_DETAIL_BY_ID}${packageDetailId}`
				}),
				providesTags: ['packageDetails']
			}),
			updatePackageDetail: build.mutation({
				query: (packageDetail) => ({
					url: `${UPDATE_PACKAGE_DETAIL}${packageDetail?.packageDetailId}`,
					method: 'PUT',
					data: packageDetail
				}),
				invalidatesTags: ['packageDetails']
			}),
			createPackageDetail: build.mutation({
				query: (newPackageDetail) => ({
					url: CREATE_CLIENT,
					method: 'POST',
					data: PackageDetailModel(newPackageDetail)
				}),
				invalidatesTags: ['packageDetails']
			})
		}),
		overrideExisting: false
	});
export default PackageDetailApi;
export const {
	useGetPackageDetailsQuery,
	useDeletePackageDetailsMutation,
	useGetPackageDetailQuery,
	useUpdatePackageDetailMutation,
	useDeletePackageDetailMutation,

	useCreatePackageDetailMutation
} = PackageDetailApi;

export const selectFilteredPackageDetails = (packageDetails) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return packageDetails;
		}

		return FuseUtils.filterArrayByString(packageDetails, searchText);
	});
