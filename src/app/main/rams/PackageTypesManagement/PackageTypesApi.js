import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_PACKAGE_TYPE,
	DELETE_PACKAGE_TYPE,
	GET_PACKAGE_TYPES,
	GET_PACKAGE_TYPE_BY_ID,
	UPDATE_PACKAGE_TYPE
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import PackageTypeModel from './packageType/models/PackageTypeModel';

export const addTagTypes = ['packageTypes'];
const PackageTypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPackageTypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PACKAGE_TYPES, params: { page, size, searchKey } }),
				providesTags: ['packageTypes']
			}),
			deletePackageTypes: build.mutation({
				query: (packageTypeIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: packageTypeIds
				}),
				invalidatesTags: ['packageTypes']
			}),
			getPackageType: build.query({
				query: (packageTypeId) => ({
					url: `${GET_PACKAGE_TYPE_BY_ID}${packageTypeId}`
				}),
				providesTags: ['packageTypes']
			}),
			createPackageType: build.mutation({
				query: (newPackageType) => ({
					url: CREATE_PACKAGE_TYPE,
					method: 'POST',
					data: PackageTypeModel({
						...newPackageType
					})
				}),
				invalidatesTags: ['packageTypes']
			}),
			updatePackageType: build.mutation({
				query: (packageType) => ({
					url: `${UPDATE_PACKAGE_TYPE}${packageType.id}`,
					method: 'PUT',
					data: {
						...packageType
					}
				}),
				invalidatesTags: ['packageTypes']
			}),
			deletePackageType: build.mutation({
				query: (packageTypeId) => ({
					url: `${DELETE_PACKAGE_TYPE}${packageTypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['packageTypes']
			})
		}),
		overrideExisting: false
	});
export default PackageTypeApi;
export const {
	useGetPackageTypesQuery,
	useDeletePackageTypesMutation,
	useGetPackageTypeQuery,
	useUpdatePackageTypeMutation,
	useDeletePackageTypeMutation,

	useCreatePackageTypeMutation
} = PackageTypeApi;

export const selectFilteredPackageTypes = (packageTypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return packageTypes;
		}

		return FuseUtils.filterArrayByString(packageTypes, searchText);
	});
